from src.database import getTuplesFromDataBase


def selectRequest(json_query: dict) -> list[dict]:
    """
    Executes SQL query to return list of customers.
    
    Args:
        json_query: a dictionary containing information needed to execute the query.
            Note, the value of `param_age` indicates the upper limit of the decade (i.e. 299 corresponds to ages 20-29). It will be one of:
            {'all', '9', '19', '29', '39', '49', '59', '69', '79', '89', '99', '100+'}
        
        
    Returns:
        A list of customers (represented as dictionaries).
        Each customer dictionary will have the following keys:
        {customer_id:ID, customer_name:NAME, age:AGE, created_at:"YYYY-MM-DD hh:mm:ss"}
        
    Examples:
    >>> selectRequest({'param_age' : '29'})
    >>> [{'customer_id':1, 'customer_name':'Mark', 'age':22, 'created_at':'2024-06-28 20:30:00'},
    ...  {'customer_id':2, 'customer_name':'Sandy', 'age':50, 'created_at':'2021-09-08 13:00:00'}]
    >>> selectRequest({'param_age' : '100+'})
    >>> [{'customer_id':3, 'customer_name':'Gregory', 'age':102, 'created_at':'1985-02-21 11:20:00'}]
    """
    sqlQuery = "SELECT * FROM Customer"
    whereClause = ""

    param_age = json_query["param_age"]
    if param_age == "100+":  # customer is 100+ years old
        whereClause = " WHERE age >= 100"
    elif param_age.isnumeric():  # customer is within decade age range
        upper_age = int(param_age)
        lower_age = upper_age - 9
        whereClause = f" WHERE {lower_age} <= age AND age <= {upper_age}"
    elif param_age == "all":
        pass # Just execute SELECT * FROM Customer
    else:
        raise TypeError(f"Error: param_age is {param_age}")

    sqlQuery += whereClause

    # returns list of JSON tuples
    return getTuplesFromDataBase(sqlQuery)
