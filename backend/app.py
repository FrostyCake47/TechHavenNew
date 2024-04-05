from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin, logging

app = Flask(__name__)
CORS(app)


@app.after_request
def add_headers(response):
    response.headers.add('Content-Type', 'application/json')
    response.headers.add('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'content-type, traceid, withcredentials')
    response.status=200
    logging.getLogger('demo2').info('into add_headers')
    return response

# Connect endpoint
@app.route('/connect', methods=['POST'])
@cross_origin(origin='*')
def connect():
    try:
        com_port = request.json.get('comport')
        command = request.json.get('command')
        return jsonify({'message': 'Got the comport' + str(com_port) + "command: " + str(command)})
    except Exception as e:
        return jsonify({"message": "some error: " + e})

# Send command endpoint
@app.route('/sendcommand', methods=['POST'])
@cross_origin(origin='*')
def send_command():
    try:
        command = request.json.get('command')
        return jsonify({'message': "got command: " + command})
    except Exception as e:
        return jsonify({"message": "error: " + e})


if __name__ == '__main__':
    app.run(debug=True, port=5002)