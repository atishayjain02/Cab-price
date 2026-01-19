print("APP.PY LOADED")

import math
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ REQUIRED for frontend

@app.route("/")
def home():
    return "backend is running"

@app.route("/status")
def status():
    return jsonify({"status": "ok"})

# -------------------------
# Distance calculation
# -------------------------
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km

    lat1, lon1, lat2, lon2 = map(
        math.radians, [lat1, lon1, lat2, lon2]
    )

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.asin(math.sqrt(a))

    return round(R * c, 2)

# -------------------------
# Geocoding (text → coords)
# -------------------------
def geocode(place):
    res = requests.get(
        "https://nominatim.openstreetmap.org/search",
        params={"q": place, "format": "json"},
        headers={"User-Agent": "cab-price-app"},
        timeout=10
    )

    data = res.json()
    if not data:
        return None

    return float(data[0]["lat"]), float(data[0]["lon"])

# -------------------------
# MAIN API
# -------------------------
@app.route("/compare", methods=["POST"])
def compare():
    data = request.json

    if not data or "from" not in data or "to" not in data:
        return jsonify({"error": "from and to are required"}), 400

    from_place = data["from"]
    to_place = data["to"]

    from_coords = geocode(from_place)
    to_coords = geocode(to_place)

    if not from_coords or not to_coords:
        return jsonify({"error": "location not found"}), 400

    from_lat, from_lng = from_coords
    to_lat, to_lng = to_coords

    distance_km = calculate_distance(
        from_lat, from_lng, to_lat, to_lng
    )

    rates = {
        "uber": 12,
        "ola": 11,
        "rapido": 9
    }

    prices = {
        cab: round(distance_km * rate, 2)
        for cab, rate in rates.items()
    }

    return jsonify({
        "from": from_place,
        "to": to_place,
        "distance_km": distance_km,
        "prices": prices
    })

if __name__ == "__main__":
    app.run(debug=True)
