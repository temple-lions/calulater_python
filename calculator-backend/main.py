from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

class Expression(BaseModel):
    input: str

@app.post("/calculate")
def calculate(expression: Expression):
    try:
        result = eval(expression.input)
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}
