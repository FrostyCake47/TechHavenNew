from flask import Flask #, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Variable to be broadcasted
variable_to_broadcast = 123

def update_variableFunc(new_value):
    variable_to_broadcast = new_value
    socketio.emit('variable_update', str(variable_to_broadcast))

# WebSocket endpoint to handle client connections
@socketio.on('connect')
def handle_connect():
    emit('variable_update', str(variable_to_broadcast))

# Endpoint to update the variable and broadcast it
@app.route('/update-variable', methods=['POST'])
def update_variable():
    update_variableFunc(567)
    socketio.emit('variable_update', str(variable_to_broadcast))
    return 'Variable updated and broadcasted. ' + str(variable_to_broadcast)

if __name__ == '__main__':
    socketio.run(app, port=5000)
