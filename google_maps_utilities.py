# utilities to retrieve data from google maps and minimally format the results

from typing import Tuple
from dataclasses import dataclass

import polyline

from transportation import Transportation

DOG_PARKS_QUERY_STRING = "dog park"    # Google Maps does not have a specific place_type for dog parks, so we are querying the phrase

# type alias
Coordinate = Tuple[float, float]

@dataclass
class MeasuredPolyline:
    distance_meters: int
    coordinates: list[Coordinate]

# Google Maps api call to retrieve a polyline (points that form continuous line segments) for optimal route between 2 locations
# origin: origin address string (Google Maps is pretty lenient; e.g. 'Central Park' will map onto the park in NYC)
# destination: destination address string
# use_multiple_routes: whether the api will query for more than 1 route (may result in longer response times)
# mode: mode of transportation (see Transportation enum)
def get_measured_polylines(gmaps, origin: str, destination: str, use_multiple_routes: bool = True, mode: str = Transportation.DRIVING) -> list[MeasuredPolyline]:
    results = gmaps.directions(
        origin,
        destination,
        alternatives=use_multiple_routes,
        mode=mode
    )

    measured_polylines = []
    for result in results:
        distance_meters = first(result['legs'])['distance']['value']
        undecoded_polyline = result['overview_polyline']['points']
        decoded_polyline = polyline.decode(undecoded_polyline) # turn undecoded string into tuple of latitude and longitude (floats)
        measured_polylines.append(MeasuredPolyline(coordinates=decoded_polyline, distance_meters=distance_meters))

    breakpoint()
    return measured_polylines

def first(xs):
    return xs[0]

# location: latitude and longitude
# num_parks: number of parks we recieve in the response
def get_dog_parks_for_location(gmaps, location: Tuple[float, float], num_parks: int = 5):
    dog_parks = gmaps.places(
        location=location,
        query=DOG_PARKS_QUERY_STRING
    )
    
    # return specific number of closest dog parks
    results = dog_parks['results'][0:num_parks]
    return [
        {
            'name': result['name'], 
            'address': result['formatted_address'], 
            'location': result['geometry']['location']
        } for result in results
    ]

def get_midpoint_for_addresses(gmaps, origin: str, destination: str, use_multiple_routes: bool = True) -> Tuple[float, float]:
    measured_polylines = get_measured_polylines(gmaps, origin, destination, use_multiple_routes)
    
    distance_meters = measured_polylines[0].distance_meters
    coordinates = measured_polylines[0].coordinates

    # get the midpoint in the polyline by getting the middle index of the array of points
    mid_index = int(len(coordinates) / 2)
    
    # TODO: do better calculation here
    return coordinates[mid_index]


# def get_distance_from_park(...)