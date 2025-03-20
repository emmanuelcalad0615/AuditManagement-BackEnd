from flask import Flask, request, jsonify, render_template

from controller import sector

app = Flask(__name__)
app.register_blueprint(sector, url_prefix='/sector')

if __name__ == "__main__":
    app.run(debug=True)