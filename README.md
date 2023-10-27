# DogParkFinder
Find closest dog parks from 2 different origin points


#### OPTIONS for finding dog park
* = origins
o = destinations (dog parks)

option 1: haversine distance for the shape of the earth
pro: not reliant on api beyond getting lat/long coordinates
con: doesn't take into account bodies of water, traffic, impassible areas, etc.
--------------------------------------
|            |________|              |
|          o |_bridge_|              |
|            |        |              |
|            |        |              |
|            | river  |              |
|        *   |        |   *          |
|            |        | o            |
|            |        |              |
|            |        |              |
|            |        |              |
|            |        |              |
|            |        |              |
|            |        |              |
--------------------------------------

option 2: find middle of route that optimizes time 
pro: faster travel time but not closer dog park at midpoint
con: analyzing optimal direction takes more api calls
--------------------------------------
|                o                   |
|               ____                 |
|             /      \               |
|            |        |              |
|            |  pond  |              |
|        *   |        |   *          |
|         \   \ ____ /   /           |
|          \____________/            |
|                                    |
|                                    |
|                                    |
|                                    |
|                o                   |
|                                    |
--------------------------------------
