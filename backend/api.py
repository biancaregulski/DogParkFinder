from flask import Flask, jsonify, request
import os

import googlemaps

from google_maps_helper import get_midpoint_for_addresses, get_dog_parks_for_location
from transportation import Transportation

app =  Flask(__name__)
gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))


@app.route('/health')
def healthcheck():
	return { 'status': 'ok' }

@app.route('/park', methods=['GET'])
def get_optimal_park():
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

	data = {
		'status': 'success',
		'results': (dog_parks[0] if dog_parks else [])
	}

	return jsonify(data), 200
