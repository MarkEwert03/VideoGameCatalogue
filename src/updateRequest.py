import os
from src.database import getTuplesFromDataBase

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = 'vgcat.db'


def updateRequest(json_query: dict):
    # json_query looks like
    # {
    #     user_id: 123,
    #     user_name: "Joe",
    #     age: 25
    # }
    ref_id = json_query["user_id"]
    updated_name = json_query["user_name"]
    updated_age = json_query["age"]
    sql_query = f"UPDATE User SET user_name = {updated_name}, age = {updated_age} WHERE user_id = {ref_id}"
    return getTuplesFromDataBase(sql_query)
