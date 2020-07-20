from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'DEVEL_KEY'
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect', namespace='/chat')
def chat_connection():
    emit("Client connected")


@socketio.on('message', namespace='/chat')
def chat_message(msg):
    send(msg, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, debug=True)
