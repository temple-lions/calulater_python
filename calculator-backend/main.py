from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import ast
import operator as op

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Request & Response Models ------------------------------------------------
class CalcRequest(BaseModel):
    input: str = Field(..., min_length=1, max_length=100, description="Math expression, e.g. '3+4*2'.")


class CalcResponse(BaseModel):
    result: float


# ----- Allowed Operators --------------------------------------------------------
_BIN_OPS = {
    ast.Add: op.add,
    ast.Sub: op.sub,
    ast.Mult: op.mul,
    ast.Div: op.truediv,
    ast.Mod: op.mod,
    ast.Pow: op.pow,
}

_UNARY_OPS = {
    ast.UAdd: op.pos,
    ast.USub: op.neg,
}


# ----- Safe Evaluation ----------------------------------------------------------
def _eval_node(node):
    # Numbers
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return node.value
    # Python <3.8 compatibility (Num)
    if isinstance(node, ast.Num):  # pragma: no cover (legacy)
        return node.n

    # Binary operations: a + b, a * b, etc.
    if isinstance(node, ast.BinOp):
        left = _eval_node(node.left)
        right = _eval_node(node.right)
        op_type = type(node.op)
        func = _BIN_OPS.get(op_type)
        if func is None:
            raise ValueError("Operator not allowed.")
        if op_type is ast.Div and right == 0:
            raise ZeroDivisionError
        return func(left, right)

    # Unary operations: +a, -a
    if isinstance(node, ast.UnaryOp):
        op_type = type(node.op)
        func = _UNARY_OPS.get(op_type)
        if func is None:
            raise ValueError("Operator not allowed.")
        operand = _eval_node(node.operand)
        return func(operand)

    # Parentheses are handled implicitly by AST structure; no special case needed.

    raise ValueError("Unsupported expression element.")


def safe_eval(expr: str):
    """
    Parse a math expression string and safely evaluate only numbers and + - * / % ** parentheses.
    Raises ValueError or ZeroDivisionError on problems.
    """
    try:
        parsed = ast.parse(expr, mode="eval")
    except SyntaxError:
        raise ValueError("Invalid syntax.")
    return _eval_node(parsed.body)


# ----- Routes -------------------------------------------------------------------
@app.get("/")
def read_root():
    return {"message": "Calculator API is running."}


@app.post("/calculate", response_model=CalcResponse)
def calculate(req: CalcRequest):
    expr = req.input.strip()

    # (Length already enforced by Pydantic, but double-check if you like)
    if len(expr) == 0:
        raise HTTPException(status_code=400, detail="Expression is empty.")

    try:
        result = safe_eval(expr)
    except ZeroDivisionError:
        raise HTTPException(status_code=400, detail="Division by zero.")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"result": result}