import os
import sqlite3

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = 'vgcat.db'


def getTuplesFromDataBase(sql_query: str) -> list[dict]:
    """
    Executes SQL query to return the result of the query.
    
    Args:
        sql_query: A string containing the text of the SQL query to execute.
            e.x. `'SELECT * FROM Table where val < 10'`
        
    Returns:
        A list representing the result of the query (rows of the database)
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute(sql_query)
    tuples = cursor.fetchall()

    result_list = [dict(tup) for tup in tuples]

    conn.close()
    return result_list


def executeQuery(sql_query: str) -> str:
    """
    Excutes the SQL query to the local database file.
    
    Args:
        sql_query: A string containing the text of the SQL query to execute.
        
    Returns:
        message: A message indicating the status of the query. One of:
        {'success', 'error'}
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row

        c = conn.cursor()
        c.execute("PRAGMA foreign_keys = ON;")
        # print(sql_query)
        c.execute(sql_query)
        conn.commit()
        conn.close()

        if c.rowcount == 0:
            raise ValueError("no rows were updated")

        return "success"
    except:
        return "error"
