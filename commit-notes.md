## commit notes

## set up back-end

    installed fastapi and Pydantic

Created a FastAPI project
Wrote your first API endpoint
Got the server running
Ready to build out more functionality

# add error handling or security to the backend

Change and Why it matters

1. Added / GET route

   No more 404 when Cmd+Clicking the server link. Good for health checks.

2. Replaced eval()

   Prevents arbitrary Python execution (huge security risk).

3. Safe AST parsing

   Only allows numbers and arithmetic ops you approve.

4. Pydantic model w/ field validation

   Rejects empty or too-long expressions cleanly.

5. Structured error handling

   Returns correct 400 responses for user errors (syntax, division by zero).

6. Typed response model

   Swagger docs show clear result format. Good for frontend integration.

## set up cors

pip install fastapi[all]
update main.py

## set up frontend

install next.js

## Update Ui

add conponents and cleaned page.tsx

## add expression history

History items appear under the calculator

You can click to reuse expressions

You can clear history with one click

## Update Ui

UI changes
