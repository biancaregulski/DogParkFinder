# enum for accepted transportation types for google maps directions
from enum import Enum

class Transportation(str, Enum):
    DRIVING = 'driving'
    BIKING  = 'bicycling'
    WALKING = 'walking'
    TRANSIT = 'transit'
	
    @classmethod
    def get_values(cls):
        return cls._member_map_.values()