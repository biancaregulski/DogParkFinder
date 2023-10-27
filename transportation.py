from enum import Enum

class Transportation(str, Enum):
    DRIVING = 'driving'
    BIKING  = 'biking'
    WALKING = 'walking'
    TRANSIT = 'transit'
	