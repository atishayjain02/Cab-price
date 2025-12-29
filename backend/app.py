print("APP.PY LOADED")
from flask import Flask,jsonify,request

app = Flask(__name__)

@app.route("/")
def home():
    return "backend is runing"

@app.route("/status")
def status():
    return jsonify({"status":"ok"})

@app.route("/compare",methods=["POST"])
def compare():
     print("COMPARE ROUTE HIT")
     data = request.json
     return jsonify({
        "message":"data received successfully",
        "data":data
    })

if __name__ == "__main__":
    app.run(debug=True)