print("APP.PY LOADED")
import math
from flask import Flask,jsonify,request

app = Flask(__name__)

@app.route("/")
def home():
    return "backend is runing"

@app.route("/status")
def status():
    return jsonify({"status":"ok"})

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # km

    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.asin(math.sqrt(a))

    return round(R * c, 2)


@app.route("/compare",methods=["POST"])
def compare():
     data = request.json

     if not data or "from" not in data or "to" not in data:
         return jsonify({
             "error":"from and to field are required"
         }),400
     
     try:
         from_lat = data["from"]["lat"]
         from_lng = data["from"]["lng"]
         to_lat = data["to"]["lat"]
         to_lng = data["to"]["lng"]
     except:
         return jsonify({
            "error":"invalid coordinate format" 
         }),400

     distance_km = calculate_distance(from_lat,from_lng,to_lat,to_lng)

     rates = {
        "uber":12,
        "ola":11,
        "rapido":9
     }

     prices = {}
     for cab, rate in rates.items():
        prices[cab] = round(distance_km * rate,2)

    
     return jsonify({
        "distance_km": distance_km,
        "prices": prices
    })
if __name__ == "__main__":
    app.run(debug=True)