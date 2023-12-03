# utilities to retrieve data from google maps and minimally format the results

from typing import Tuple
import math

import polyline
from functools import cache

from general_helper import first, last
from transportation import Transportation

DOG_PARKS_QUERY_STRING = "dog park"    # Google Maps does not have a specific place_type for dog parks, so we are querying the phrase

# type alias
Coordinate = Tuple[float, float]

def get_midpoint_for_addresses(gmaps, origin: str, destination: str, use_multiple_routes: bool = True) -> Coordinate:
    """
    Find midpoint of route between two addresses
    """
    polylines = get_direction_polylines(gmaps, origin, destination, use_multiple_routes)
    
    coordinates = first(polylines)
    mid_distance = get_distance_of_polyline(coordinates) / 2
    return get_point_on_polyline(mid_distance, coordinates)

# @cache
def get_direction_polylines(
    gmaps, 
    origin: str, 
    destination: str, 
    use_multiple_routes: bool = False, 
    mode: str = Transportation.DRIVING
    ) -> list[Coordinate]:
    """
    Call Google Maps API to retrieve polyline (points that form continuous line segments) for optimal route between 2 locations
    origin: origin address string (Google Maps is pretty lenient; e.g. 'Central Park' will map onto the park in NYC)
    destination: destination address string
    use_multiple_routes: whether the api will query for more than 1 route (may result in longer response times)
    mode: mode of transportation (see Transportation enum)
    """
    
    results = gmaps.directions(
        origin,
        destination,
        alternatives=use_multiple_routes,
        mode=mode
    )

    polylines = []
    for result in results:
        undecoded_polyline = result['overview_polyline']['points']
        decoded_polyline = polyline.decode(undecoded_polyline) # turn undecoded string into tuple of latitude and longitude (floats)
        polylines.append(decoded_polyline)

    return polylines

# @cache
def get_dog_parks_for_location(gmaps, location: Coordinate) -> list[dict]:
    """
    Call Google Maps API to retrieve optimal dog parks for location 
    """
    dog_parks = gmaps.places(
        location=location,
        query=DOG_PARKS_QUERY_STRING
    )
    
    # return specific number of closest dog parks
    results = dog_parks['results'][0:5]
    return [
        {
            'id': result['place_id'],
            'name': result['name'], 
            'address': result['formatted_address'], 
            'location': result['geometry']['location']
        } for result in results
    ]


def get_point_on_polyline(target_distance: int, coordinates: list[Coordinate]) -> Coordinate:
    """
    Iterate through line segments on polyline until reaching target distance
    """
    total_distance = 0

    for i in range(1, len(coordinates)):
        current_distance = math.dist(coordinates[i - 1], coordinates[i])
        if total_distance + current_distance > target_distance:

            p1, p2 = coordinates[i - 1], coordinates[i]
            remaining_distance = target_distance - total_distance
            return get_point_on_line_segment(remaining_distance, p1, p2)
        else:
            total_distance += current_distance

    raise ValueError("target distance not found on polyline")


def get_distance_of_polyline(coordinates) -> float:
    """
    Find length of a polyline by summing the length of its line segments
    """
    total = 0
    for i in range(1, len(coordinates)):
        total += math.dist(coordinates[i - 1], coordinates[i])
    return total

def get_point_on_line_segment(target_distance: float, p1: Coordinate, p2: Coordinate) -> Coordinate:
    """
    Find point between two coordinates at target distance
    """
    x_dist = first(p2) - first(p1)
    y_dist = last(p2) - last(p1)

    # get euclidian distance
    vector_dist = (x_dist ** 2 + y_dist ** 2) ** 0.5

    # get unit vector (the vector with length 1)
    unit_vector = (x_dist / vector_dist, y_dist / vector_dist)

    # use unit_vector and target distance to find points
    return (
        first(p1) + (first(unit_vector) * target_distance),
        last(p1) + (last(unit_vector) * target_distance)
    )

def format_results(gmaps, origin: str, destination: str, dog_parks: list[dict]) -> dict:
    address1_result = {
        'address': origin,
        'location': gmaps.geocode(origin)[0]['geometry']['location'],
        'id': gmaps.geocode(origin)[0]['place_id']
    }

    address2_result = {
        'address': destination,
        'location': gmaps.geocode(destination)[0]['geometry']['location'],
        'id': gmaps.geocode(destination)[0]['place_id']
    }

    full_results = {
        'address1': address1_result,
        'address2': address2_result,
        'parks': dog_parks
    }

    return {
        'status': 'success',
        'results': full_results
    }
