from flask import Flask, jsonify, request
import os

import googlemaps

from google_maps_utilities import get_midpoint_for_addresses, get_dog_parks_for_location
from transportation import Transportation

app =  Flask(__name__)
gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))


@app.route('/health')
def healthcheck():
	return { 'status': 'ok' }

@app.route('/park', methods=['GET'])
def get_optimal_park():
	args = request.args
	for required in ['origin', 'destination']:
		# check for blank or empty params
		if not args.get(required):
			return jsonify(status="missing_input", message="Missing param: '{}'".format(required)), 422

	origin = args.get('origin')
	destination = args.get('destination')
	transportation = args.get('transportation')
	use_multiple_routes = args.get('multiple_routes')

	# transportation is optional but must be in enum if present
	if transportation and transportation not in Transportation.get_values():
		return jsonify(status="invalid_input", message="Invalid transportation param: '{}'".format(transportation)), 400
	
	try:
		midpoint = get_midpoint_for_addresses(gmaps, origin, destination, use_multiple_routes)
		dog_parks = get_dog_parks_for_location(gmaps, midpoint)
	except Exception as e:
		return jsonify(status="server_error", message=str(e)), 400
		# TODO: narrow exceptions

	data = {
		'status': 'success',
		'results': (dog_parks[0] if dog_parks else [])
	}

	return jsonify(data), 200

#### OPTIONS for finding dog park
# * = origins
# o = destinations (dog parks)

# option: haversine distance for the shape of the earth
# pro: not reliant on api beyond getting lat/long coordinates
# con: doesn't take into account bodies of water, traffic, impassible areas, etc.
# --------------------------------------
# |            |________|              |
# |          o |_bridge_|              |
# |            |        |              |
# |            |        |              |
# |            | river  |              |
# |        *   |        |   *          |
# |            |        | o            |
# |            |        |              |
# |            |        |              |
# |            |        |              |
# |            |        |              |
# |            |        |              |
# |            |        |              |
# --------------------------------------

# option: find middle of route that optimizes time 
# issue: faster travel time but not closer dog park at midpoint
# --------------------------------------
# |                o                   |
# |               ____                 |
# |             /      \               |
# |            |        |              |
# |            |  pond  |              |
# |        *   |        |   *          |
# |         \   \ ____ /   /           |
# |          \____________/            |
# |                                    |
# |                                    |
# |                                    |
# |                                    |
# |                o                   |
# |                                    |
# --------------------------------------
