import sqlite3


def selectRequest():
    # JSON looks like {user_id:01, user_name:"Mark", age:21, created_at:"2024-06-28 20:30:00"}
    sqlQuery = "SELECT * FROM User"
    return getTuplesFromDataBase(sqlQuery)


# Returns a list of dictionaries with all the rows from the sql query
def getTuplesFromDataBase(sqlQuery: str):
    dbConnection = sqlite3.connect('vgcat.db')
    dbConnection.row_factory = sqlite3.Row
    cursor = dbConnection.cursor()
    cursor.execute(sqlQuery)
    tuples = cursor.fetchall()

    result_list = [dict(tup) for tup in tuples]

    dbConnection.close()
    return result_list
