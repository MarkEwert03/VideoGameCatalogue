from flask import Flask, render_template, request
import json
from src.selectRequest import selectRequest

app = Flask(__name__)

# Route to main HTML page
@app.route('/')
def index(): 
    return render_template('index.html')

# Route to handle select request
@app.route('/select', methods=['POST'])
def selectEndpoints():
    dataDict = json.loads(request.data)
    queryResults = selectRequest(dataDict)
    return queryResults


if __name__ == '__main__':
    app.run(debug=True)
