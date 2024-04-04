from flask import Flask, request, jsonify

app = Flask(__name__)


# Connect endpoint
@app.route('/connect', methods=['POST'])
def connect():
    try:
        com_port = request.json.get('comport')
        return jsonify({'message': 'Got the comport' + com_port})
    except Exception as e:
        return jsonify({"message": "some error: " + e})

# Send command endpoint
@app.route('/sendcommand', methods=['POST'])
def send_command():
    try:
        command = request.json.get('command')
        return jsonify({'message': "got command: " + command})
    except Exception as e:
        return jsonify({"message": "error: " + e})


if __name__ == '__main__':
    app.run(debug=True)