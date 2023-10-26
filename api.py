from flask import Flask, jsonify, request, abort, make_response
from google_maps_utilities import get_address_from_geolocation, get_polyline_from_addresses, get_dog_parks



from typing import Tuple

app =  Flask(__name__)

@app.route('/health')
def healthcheck():
	return { 'status': 'ok' }

@app.route('/coordinates', methods=['GET'])
def get_coordinates():
# def get_coordinates() -> dict[str, float]:
	args = request.args
	address = args.get('address')
	return get_address_from_geolocation()
	# if address is None:

@app.route('/polyline', methods=['GET'])
def get_polyline():
# def get_coordinates() -> dict[str, float]:
	args = request.args
	origin = args.get('origin')
	destination = args.get('destination')
	try:
		pl = get_polyline_from_addresses(origin, destination)
		midpoint =  get_midpoint_from_polyline(pl)
	except:
		abort(400, 'error: could not access polyline')
	
	dog_parks = get_dog_parks(midpoint)
		
	data =  {
		'status': 'success',
		'dog_parks': str(dog_parks)
	}
	return make_response(jsonify(data), 200)



def get_midpoint_from_polyline(pl: list[Tuple[float, float]]) -> Tuple[float, float]:
    mid_index = int(len(pl) / 2 + 1)

    return pl[mid_index]

# @app.route('/park', methods=['GET'])
# def get_optimal_park() -> dict[str, str]:
# 	args = request.args
# 	return {
# 		'name': 'Cambridge Dog Park',
# 		'address': '400 Main St. Cambridge MA 02100',
# 		'latitude': 45,
# 		'longitude': 71
#     }

# @app.route('/top_parks', methods=['GET'])
# def get_optimal_parks() -> list[dict[str, str]]:
# 	args = request.args
# 	return [
# 		{
#             'name': 'Cambridge Dog Park',
#             'address': '400 Main St. Cambridge MA 02100',
#             'latitude': 45,
#             'longitude': 71
#         }
#     ]

# @app.route('/foo', methods=['POST'])
# def foo():
# 	data = request.json


# start_locations: [
#     {
#         "lat": 42.5,
#         "long": 71.0
#     },
#     {
#         "lat": 42.7,
#         "long": 72.3
#     },
#     {
#         "lat": 41.5,
#         "long": 70.4
#     }
# ]
# radius_miles: 5
# page_size: 5



# class StartLocation:
# 	auto id
# 	float latitude
# 	float longitude

#     def __init__(self, latitude, longitude):
#         self.latitude = latitude
# 		self.longitude = longitude
	
#     def get_average_coordinates():
#         avg_lat = (float(sum(loc['lat'] for loc in start_locations)) / len(start_locations))
#         avg_long = (float(sum(loc['long'] for loc in start_locations)) / len(start_locations))
# 		return { avg_lat, avg_long}

#     def get_fair_coordinates():
# 	avg_lat = mean(max_lat, min_lat)
#     avg_long = mean(max_long, min_long)

# print (avg_lat, avg_long)

# call api to find doog park closest to avg lat and long

# option 1:
# park_lat = mean(lats.each)
# park_long = mean(longs.each)
# --------------------------------------
# |                                    |
# |    *                               |
# |                                    |
# |                                    |
# |    *                               |
# |        o                           |
# |                                    |
# |    *                           *   |
# |                                    |
# --------------------------------------

# option 2:
# park_lat = mean(max_lat, min_lat)
# park_long = mean(max_long, min_long)
# --------------------------------------
# |                                    |
# |    *                               |
# |                                    |
# |                                    |
# |    *             o                 |
# |                                    |
# |                                    |
# |    *                           *   |
# |                                    |
# --------------------------------------