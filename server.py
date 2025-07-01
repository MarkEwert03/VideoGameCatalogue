from flask import Flask, render_template, request, jsonify
import json
from src.selectRequest import selectRequest
from src.updateRequest import updateRequest

app = Flask(__name__)


@app.route('/')  # Route to main HTML page
def index():
    return render_template('index.html')


@app.route('/select', methods=['POST'])  # Route to handle select request
def selectEndpoint():
    dataDict = json.loads(request.data)
    queryResults = selectRequest(dataDict)
    return queryResults


@app.route('/update', methods=['POST'])  # Route to handle update request
def updateEndpoint():
    dataDict = json.loads(request.data)
    queryStatus = updateRequest(dataDict)
    return jsonify({"update_status": queryStatus})


if __name__ == '__main__':
    app.run(debug=True)
