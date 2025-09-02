from flask import Flask, render_template, request, jsonify
import json
from src.selectRequest import selectRequest
from src.updateRequest import updateRequest
from src.insertRequest import insertRequest
from src.deleteRequest import deleteRequest

app = Flask(__name__)


@app.route("/")  # Route to main HTML page
def index():
    return render_template("index.html")


@app.route("/select", methods=["GET"])
def selectEndpoint():
    param_age = request.args.get("param_age", default="all")
    dataDict = {"param_age": param_age}
    queryResults = selectRequest(dataDict)
    return jsonify(queryResults)


@app.route("/update", methods=["POST"])
def updateEndpoint():
    dataDict = json.loads(request.data)
    queryStatus = updateRequest(dataDict)
    return jsonify({"update_status": queryStatus})


@app.route("/insert", methods=["POST"])
def insertEndpoint():
    dataDict = json.loads(request.data)
    queryStatus = insertRequest(dataDict)
    return jsonify({"insert_status": queryStatus})


@app.route("/delete", methods=["POST"])
def deleteEndpoint():
    dataDict = json.loads(request.data)
    queryStatus = deleteRequest(dataDict)
    return jsonify({"delete_status": queryStatus})


if __name__ == "__main__":
    app.run(debug=True)
