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
     data = request.json

     if not data or "from" not in data or "to" not in data:
         return jsonify({
             "error":"from and to field are required"
         }),400
     
     from_location = data["from"]
     to_location = data["to"]

     distance_km = 20

     rates = {
        "uber":12,
        "ola":11,
        "rapido":9
     }

     prices = {}
     for cab, rate in rates.items():
        prices[cab] = distance_km * rate

    
     return jsonify({
        "route": f"{from_location} → {to_location}",
        "distance_km": distance_km,
        "prices": prices
    })
if __name__ == "__main__":
    app.run(debug=True)