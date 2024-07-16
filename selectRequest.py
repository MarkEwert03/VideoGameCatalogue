import sqlite3


def selectRequest(jdict):
    sqlQuery = "SELECT * FROM User"
    whereClause = ""
    
    # jdict looks like {param_age : x}
    param_age = jdict["param_age"]
    if param_age == "100+":
        whereClause = " WHERE age >= 100"
    elif param_age.isnumeric():
        upper_age = int(param_age)
        lower_age = upper_age - 9
        whereClause = f" WHERE {lower_age} <= age AND age <= {upper_age}"
        
    sqlQuery += whereClause
    
    # returns list of JSON tuples
    # JSON tuple looks like {user_id:01, user_name:"Mark", age:21, created_at:"2024-06-28 20:30:00"}
    return getTuplesFromDataBase(sqlQuery)


# Returns a list of dictionaries with all the rows from the sql query
def getTuplesFromDataBase(sqlQuery: str):
    dbConnection = sqlite3.connect("vgcat.db")
    dbConnection.row_factory = sqlite3.Row
    cursor = dbConnection.cursor()
    cursor.execute(sqlQuery)
    tuples = cursor.fetchall()

    result_list = [dict(tup) for tup in tuples]

    dbConnection.close()
    return result_list
