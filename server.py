from flask import Flask, render_template, request
from selectRequest import selectRequest

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/select', methods=['POST'])
def selectEndpoints():
    queryResults = selectRequest()
    return queryResults


if __name__ == '__main__':
    app.run(debug=True)
