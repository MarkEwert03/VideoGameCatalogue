from flask import Flask, render_template, request, jsonify
import json
from src.selectRequest import selectRequest
from src.updateRequest import updateRequest

app = Flask(__name__)

# Route to main HTML page


@app.route('/')
def index():
    return render_template('index.html')

# Route to handle select request


@app.route('/select', methods=['POST'])
def selectEndpoint():
    dataDict = json.loads(request.data)
    queryResults = selectRequest(dataDict)
    return queryResults

# Route to handle update request


@app.route('/update', methods=['POST'])
def updateEndpoint():
    dataDict = json.loads(request.data)
    queryStatus = updateRequest(dataDict)
    if queryStatus == "success":
        return jsonify({"update_status": "success"})
    else:
        return jsonify({"update_status": "error"})


if __name__ == '__main__':
    app.run(debug=True)
