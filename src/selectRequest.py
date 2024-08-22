from database import getTuplesFromDataBase


def selectRequest(json_query: dict) -> list[dict]:
    sqlQuery = "SELECT * FROM User"
    whereClause = ""

    # json_query looks like
    # {
    #     param_age: 29
    # }
    param_age = json_query["param_age"]
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
