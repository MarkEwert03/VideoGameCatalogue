import os
import sqlite3

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = 'vgcat.db'

# Returns a list of dictionaries with all the rows from the sql query
def getTuplesFromDataBase(sql_query: str) -> list[dict]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute(sql_query)
    tuples = cursor.fetchall()

    result_list = [dict(tup) for tup in tuples]

    conn.close()
    return result_list
