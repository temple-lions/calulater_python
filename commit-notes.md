## commit notes

# set up back-end

    installed fastapi and Pydantic

Created a FastAPI project
Wrote your first API endpoint
Got the server running
Ready to build out more functionality

# add error handling or security to the backend

Change and Why it matters

# Added / GET route

    No more 404 when Cmd+Clicking the server link. Good for health checks.

# Replaced eval()

    Prevents arbitrary Python execution (huge security risk).

# Safe AST parsing

    Only allows numbers and arithmetic ops you approve.

# Pydantic model w/ field validation

    Rejects empty or too-long expressions cleanly.

# Structured error handling

    Returns correct 400 responses for user errors (syntax, division by zero).

# Typed response model

    Swagger docs show clear result format. Good for frontend integration.
