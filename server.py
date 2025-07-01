from flask import Flask, render_template, request, jsonify
import json
from src.selectRequest import selectRequest
from src.updateRequest import updateRequest

app = Flask(__name__)


@app.route('/')  # Route to main HTML page
def index():
    return render_template('index.html')

@app.route('/select', methods=['GET'])
def selectEndpoint():
    param_age = request.args.get('param_age', default='all')
    dataDict = {'param_age': param_age}
    queryResults = selectRequest(dataDict)
    return jsonify(queryResults)


@app.route('/update', methods=['POST'])
def updateEndpoint():
    dataDict = json.loads(request.data)
    queryStatus = updateRequest(dataDict)
    return jsonify({"update_status": queryStatus})


if __name__ == '__main__':
    app.run(debug=True)
