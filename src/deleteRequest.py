import os
from src.database import executeQuery

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = "vgcat.db"


def deleteRequest(json_query: dict) -> str:
    """
    Executes query to delete customer with passed customer ID.

    Args:
        json_query: The json dict object containing the customer ID.
            An example of what it looks like is:
            {
                customer_id: 123
            }

    Returns:
        The result of `executeQuery()`. So one of:
        {'success', 'error'}
    """

    customer_id = json_query["customer_id"]

    sql_query = f'DELETE FROM Customer WHERE customer_id = {customer_id}'
    return executeQuery(sql_query)