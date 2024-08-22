from flask import Flask, render_template, request
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
    updateRequest(dataDict)
    return {"update_status": "Success"}


if __name__ == '__main__':
    app.run(debug=True)
