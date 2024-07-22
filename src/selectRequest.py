import os
import sqlite3

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = 'vgcat.db'


def selectRequest(jdict: dict) -> list[dict]:
    sqlQuery = "SELECT * FROM User"
    whereClause = ""

    # jdict looks like {param_age : x}
    param_age = jdict["param_age"]
    if param_age == "100+":  # user is 100+ years old
        whereClause = " WHERE age >= 100"
    elif param_age.isnumeric():  # user is within decade age range
        upper_age = int(param_age)
        lower_age = upper_age - 9
        whereClause = f" WHERE {lower_age} <= age AND age <= {upper_age}"

    sqlQuery += whereClause

    # returns list of JSON tuples
    # JSON tuple looks like {user_id:01, user_name:"Mark", age:21, created_at:"2024-06-28 20:30:00"}
    return getTuplesFromDataBase(sqlQuery)


# Returns a list of dictionaries with all the rows from the sql query
def getTuplesFromDataBase(sqlQuery: str) -> list[dict]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute(sqlQuery)
    tuples = cursor.fetchall()

    result_list = [dict(tup) for tup in tuples]

    conn.close()
    return result_list
