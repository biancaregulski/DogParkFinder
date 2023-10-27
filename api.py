from flask import Flask, jsonify, request, abort, make_response
from google_maps_utilities import get_polyline_from_addresses, get_dog_parks_for_location
from typing import Tuple
from enum import Enum
from transportation import Transportation

app =  Flask(__name__)

@app.route('/health')
def healthcheck():
	return { 'status': 'ok' }

@app.route('/park', methods=['GET'])
def get_optimal_park():
	args = request.args
	for required in ['origin', 'destination']:
		# breakpoint()
		# check for blank or empty params
		if not args.get(required):
			return abort(make_response("error: missing param: '{}'".format(required)), 400)

	origin = args.get('origin')
	destination = args.get('destination')
	transportation = args.get('transportation')

	if transportation and transportation not in Transportation._member_map_.values():
		abort(make_response("error: invalid transportation param: '{}'".format(transportation)), 400)
	
	try:
		midpoint = get_midpoint_for_address(origin, destination, transportation)
	except:
		abort(400, 'error: could not access polyline')
	
	dog_parks = get_dog_parks_for_location(midpoint)
		
	data =  {
		'status': 'success',
		'dog_parks': str(dog_parks)
	}
	return make_response(jsonify(data), 200)
	

def get_midpoint_for_address(origin: str, destination: str, multiple: bool = True):
	pl = get_polyline_from_addresses(origin, destination)
	# get the midpoint in the polyline by getting the middle index of the array of points
	mid_index = int(len(pl) / 2 + 1)
	return pl[mid_index]


#### OPTIONS for finding dog park
# * = origins
# o = destinations (dog parks)

# option: haversine distance for the shape of the earth
# issue: doesn't take into account bodies of water, traffic, impassible areas, etc.
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
# |                o                   |
# |                                    |
# --------------------------------------

