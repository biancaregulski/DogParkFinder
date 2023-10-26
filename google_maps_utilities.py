import os
from typing import Tuple
import requests
from datetime import datetime
import googlemaps
import json
import polyline


def get_address_from_geolocation(address: str = "1600 Amphitheatre Parkway, Mountain View, CA", region: str = 'us'):

    params = {
        'address': address,
        'region': region,
        'key': os.environ.get('GOOGLE_MAPS_API_KEY')
    }

    req = requests.get(os.environ.get('GOOGLE_MAPS_GEOCODE_URL'), params=params)
    res = req.json()

    # deal with failed results
    return res['results'][0]

def get_polyline_from_addresses(origin ="1600 Amphitheatre Parkway, Mountain View, CA", destination = "24 Willie Mays Plaza, San Francisco, CA 94107", mode="transit"):
    gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))

    now = datetime.now()
    result = gmaps.directions(
        origin,
        destination,
        mode=mode,
        departure_time=now)

    undecoded_pl = result[0]['overview_polyline']['points']
    pl = polyline.decode(undecoded_pl)
    return pl

def get_dog_parks(midpoint: Tuple[float, float]):
    gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))
    # google maps does not have a specific place_type for dog parks, so we are querying the phrase
    dog_parks = gmaps.places(location=midpoint, query="dog park")
    
    # return 5 closest dog parks
    results = dog_parks['results'][0:5]
    return [
        {
            'name': result['name'], 
            'address': result['formatted_address'], 
            'location': result['geometry']['location']
        } for result in results
    ]







    # curl -X POST -d '{
    # "origin":{
    #     "address": "1600 Amphitheatre Parkway, Mountain View, CA"
    # },
    # "destination":{
    #     "address": "24 Willie Mays Plaza, San Francisco, CA 94107"
    # },
    # "travelMode": "DRIVE"
    # }' \
    # -H 'Content-Type: application/json' \
    # -H 'X-Goog-Api-Key: YOUR_API_KEY' \
    # -H 'X-Goog-FieldMask: routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline,routes.legs.steps.polyline' \
    # 'https://routes.googleapis.com/directions/v2:computeRoutes'    

    