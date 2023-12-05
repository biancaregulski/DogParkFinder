from flask import Flask, jsonify, request
from flask_cors import CORS
import os

import googlemaps

from google_maps_helper import get_midpoint_for_addresses, get_parks_for_location, format_results
from transportation import Transportation

app =  Flask(__name__)
cors = CORS(app)
gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))


@app.route('/health')
def healthcheck():
	return { 'status': 'ok' }

@app.route('/parks', methods=['GET'])
def get_optimal_park():
	args = request.args
	for required in ['address1', 'address2']:
		# check for blank or empty params
		if not args.get(required):
			return jsonify(status_code="missing_input", message="Missing param: '{}'".format(required)), 422

	origin = args.get('address1')
	destination = args.get('address2')
	transportation = args.get('transportation')

	# transportation is optional but must be in enum if present
	if transportation and transportation not in Transportation.get_values():
		return jsonify(status_code="invalid_input", message="Invalid transportation param: '{}'".format(transportation)), 400
	try:
		midpoint = get_midpoint_for_addresses(gmaps, origin, destination, transportation)
	except googlemaps.exceptions.ApiError as err:
		app.logger.error("Error occurred while calling Google Maps API: '{}'".format(err.status))
		if err.status == 'NOT_FOUND':
			return jsonify(status_code="address_not_found", message="Error occurred while calling Google Maps API: Address not found"), 422
		return jsonify(status_code="api_error", message="Error occurred while calling Google Maps API: '{}'".format(err.status)), 400

	if not midpoint:
		return jsonify(status_code="directions_not_found", message="Could not find directions between given addresses"), 400

	parks = get_parks_for_location(gmaps, midpoint)

	data = format_results(gmaps, origin, destination, parks)

	return jsonify(data), 200