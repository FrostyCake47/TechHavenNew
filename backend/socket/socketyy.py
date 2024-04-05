from flask import Flask #, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import time
from threading import Thread


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# Variable to be broadcasted
global variable_to_broadcast
variable_to_broadcast = 0

def update_variableFunc(new_value):
    global variable_to_broadcast
    variable_to_broadcast = new_value
    socketio.emit('variable_update', str(variable_to_broadcast),)

# WebSocket endpoint to handle client connections
@socketio.on('connect')
def handle_connect():
    app.logger.warn('WebSocket connected')
    app.logger.warn(variable_to_broadcast)
    emit('variable_update', str(variable_to_broadcast), broadcast=True)

# Endpoint to update the variable and broadcast it
@app.route('/update_variable', methods=['POST'])
def update_variable():
    update_variableFunc(567)
    app.logger.warn(variable_to_broadcast)
    socketio.emit('variable_update', str(variable_to_broadcast), )
    return 'Variable updated and broadcasted. ' + str(variable_to_broadcast)

def background_task():
    global variable_to_broadcast
    while True:
        app.logger.warn(variable_to_broadcast)
        update_variableFunc(variable_to_broadcast + 1)
        time.sleep(1)  # Sleep for 1 second

if __name__ == '__main__':
    background_thread = Thread(target=background_task)
    background_thread.daemon = True  # Daemonize the thread so it stops when the main program stops
    background_thread.start()

    socketio.run(app, host='0.0.0.0', debug=True, use_reloader=True, keyfile=None, certfile=None, port=5000)


    
    
