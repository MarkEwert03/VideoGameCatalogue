import os
from datetime import datetime
from src.database import executeQuery

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = "vgcat.db"


def validate_age(age_str: str) -> str:
    """
    Validates a given age input string and returns specific feedback for invalid inputs.

    This function checks if the input is:
    - Non-empty
    - Entirely numeric (no letters, symbols, or decimal points)
    - Non-negative
    - Within a realistic age range (0 to 130)

    Args:
        age_str: The age input provided as a string.

    Returns:
        out: A message in:
            {'valid', 'empty', 'non-integer', 'negative', 'large'}

    Examples:
    >>> validate_age("25")
    'valid'

    >>> validate_age("abc")
    'non-integer'

    >>> validate_age("150")
    'large'

    >>> validate_age("  ")
    'empty'
    """

    # Check for empty input
    if not age_str.strip():
        return "empty"

    # Check if the input is a valid integer
    try:
        age = int(age_str)
    except ValueError:
        return "non-integer"

    # Check for non-negative number
    if age <= 0:
        return "negative"

    # Check for realistic age range (1 to 130 for human ages)
    if age > 130:
        return "large"

    # If all checks pass, return valid
    return "valid"


def insertRequest(json_query: dict) -> str:
    """
    Executes query to insert a new customer with passed information.

    Args:
        json_query: The json dict object containing the information about the customer.
            An example of what it looks like is:
            {
                customer_name: "Joe",
                age: 25
            }

    Returns:
        The result of `validate_age()` or `executeQuery()`. So one of:
        {'success', 'error', 'valid', 'empty', 'non-integer', 'negative', 'large'}
    """

    customer_name = json_query["customer_name"]

    customer_age = json_query["age"]
    age_check = validate_age(customer_age)
    if age_check != "valid":
        return age_check

    # Generate current timestamp for created_at
    current_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    sql_query = f'INSERT INTO Customer (customer_name, age, created_at) VALUES ("{customer_name}", {customer_age}, "{current_timestamp}")'
    return executeQuery(sql_query)