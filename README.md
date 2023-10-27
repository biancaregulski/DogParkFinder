# DogParkFinder
Find closest dog parks from 2 different origin points
```
Sample call: 
GET /park

arguments:
address1 (string): description of 1st address in natural language
address2 (string):description of 2nd address in natural language
transportation (string, optional): transit method ('driving' (default), 'walking', 'biking', 'transit')
```
On local dev, to find closest dog park between Boston Common and Porter Square in Cambridge by walking:
http://127.0.0.1:5000/park?address1=4%20Charles%20Street.%20Boston,%20MA%2002116&address2=Porter Square, Cambridge MA&transportation=walking

# Future Directions:
- instead of choosing default closest dog park, compare ~5 by their distance to each given address

#### Options for finding dog park
* = origins
o = destinations (dog parks)
```
option 1: calculate distance between 2 points (e.g. haversine distance for the shape of the earth)
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
```