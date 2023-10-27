import os
from typing import Tuple
from datetime import datetime
import googlemaps
import polyline
from enum import Enum
from transportation import Transportation

PLACES_QUERY_STRING = "dog park"

def get_polyline_from_addresses(origin ="1600 Amphitheatre Parkway, Mountain View, CA", destination = "24 Willie Mays Plaza, San Francisco, CA 94107", alternatives: bool = False, mode: str = Transportation.DRIVING):
    gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))

    now = datetime.now()
    result = gmaps.directions(
        origin,
        destination,
        alternatives=alternatives,
        mode=mode,
        departure_time=now)

    undecoded_pl = result[0]['overview_polyline']['points']
    pl = polyline.decode(undecoded_pl)
    return pl

# location: latitude and longitude
# num_parks: number of parks we recieve in the response
# alternatives: whether the api will query for more than 1 route (may result in longer response times)
# mode: driving, biking, 
def get_dog_parks_for_location(location: Tuple[float, float], num_parks: int = 5):
    gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_API_KEY'))
    # google maps does not have a specific place_type for dog parks, so we are querying the phrase

    dog_parks = gmaps.places(location=location, query=PLACES_QUERY_STRING)
    
    # return specific number of closest dog parks
    results = dog_parks['results'][0:num_parks]
    return [
        {
            'name': result['name'], 
            'address': result['formatted_address'], 
            'location': result['geometry']['location']
        } for result in results
    ]

