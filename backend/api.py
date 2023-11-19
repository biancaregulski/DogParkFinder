from flask import Flask, jsonify, request
from flask_cors import CORS
import os

import googlemaps

from google_maps_helper import get_midpoint_for_addresses, get_dog_parks_for_location, format_results
from transportation import Transportation

app =  Flask(__name__)
cors = CORS(app)
gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))


@app.route('/health')
def healthcheck():
	return { 'status': 'ok' }

@app.route('/park', methods=['GET'])
def get_optimal_park():
	# return {"results":{"address":"Watertown, MA 02473, United States","location":{"lat":42.366578,"lng":-71.149141},"name":"Filippello Dog Park"},"status":"success"}
	args = request.args
	for required in ['address1', 'address2']:
		# check for blank or empty params
		if not args.get(required):
			return jsonify(status="missing_input", message="Missing param: '{}'".format(required)), 422

	origin = args.get('address1')
	destination = args.get('address2')
	transportation = args.get('transportation')

	# transportation is optional but must be in enum if present
	if transportation and transportation not in Transportation.get_values():
		return jsonify(status="invalid_input", message="Invalid transportation param: '{}'".format(transportation)), 400
	
	midpoint = get_midpoint_for_addresses(gmaps, origin, destination)
	dog_parks = get_dog_parks_for_location(gmaps, midpoint)

	data = format_results(gmaps, origin, destination, dog_parks)

	return jsonify(data), 200