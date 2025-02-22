from flask import Flask
from spotify.auth.login import auth_bp

app = Flask(__name__)

app.register_blueprint(auth_bp)

@app.route('/')
def hello_world():
    return 'Hello, World from Flask!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)