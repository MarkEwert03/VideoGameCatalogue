import os
from src.database import executeQuery

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = 'vgcat.db'


def validate_age(age_str: str) -> str:
    """
    Validates a given age input string and returns specific feedback for invalid inputs.

    This function checks if the input is:
    - Non-empty
    - Entirely numeric (no letters, symbols, or decimal points)
    - Non-negative
    - Within a realistic age range (0 to 130)

    Parameters:
        age_str (str): The age input provided as a string.

    Returns:
        out (str): A message indicating either "valid" for a valid input, or a specific reason why the input is invalid.

    Examples:
    >>> validate_age("25")
    'valid'

    >>> validate_age("abc")
    'non-numeric'

    >>> validate_age("150")
    'large'

    >>> validate_age("  ")
    'empty'
    """

    # Check for empty input
    if not age_str.strip():
        return "empty"

    # Check if the input is numeric and doesn't contain letters or symbols
    if not age_str.isdigit():
        return "non-numeric"

    # Convert to integer now that we know it's all digits
    age = int(age_str)

    # Check for non-negative number
    if age < 0:
        return "negative"

    # Check for realistic age range (0 to 130 for human ages)
    if age > 130:
        return "large"

    # If all checks pass, return valid
    return "valid"


def updateRequest(json_query: dict):
    """
    executes query to update user with given information in json_query

    returns "error" if there was an error in the query
    """
    # json_query looks like
    # {
    #     user_id: 123,
    #     user_name: "Joe",
    #     age: 25
    # }
    ref_id = json_query["user_id"]
    
    updated_name = json_query["user_name"]
    
    updated_age = json_query["age"]
    age_check = validate_age(updated_age)
    if age_check != "valid":
        return age_check
    
    
    sql_query = f'UPDATE User SET user_name = "{updated_name}", age = {updated_age} WHERE user_id = {ref_id}'
    return executeQuery(sql_query)
