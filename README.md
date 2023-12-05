# DogParkFinder
API for finding closest dog parks from 2 different origin points.
Written in Python Flask with Google Maps API.

To run app:
tab 1:
```
cd frontend 
npm run dev
```
tab 2:
cd backend
python -m flask run

Find closest dog parks from 2 different origin points

To run app:
python -m flask run

```
Sample call: 
GET /parks

arguments:
address1 (string): description of 1st address in natural language
address2 (string): description of 2nd address in natural language
transportation (string, optional): transit method ('driving' (default), 'walking', 'biking', 'transit')
```
On local dev, to find closest dog park between Boston Common and Porter Square in Cambridge by walking:
http://127.0.0.1:5000/parks?address1=4%20Charles%20Street.%20Boston,%20MA%2002116&address2=Porter Square, Cambridge MA&transportation=walking

sample return:
{"results":{"address":"29 Tudor St, Cambridge, MA 02139, United States","location":{"lat":42.3606643,"lng":-71.1038626},"name":"Tudor Dog Park"},"status":"success"}


# Future Directions:
- pull multiple route polylines and find different midpoint for each
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