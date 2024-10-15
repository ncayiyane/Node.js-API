<!-- 
RESTful API Server
This is a simple RESTful API server built using Node.js and the built-in http module. The server provides endpoints for creating, reading, updating, and deleting (CRUD) items in a JSON file.

Endpoints
GET /items
Returns a list of all items in the JSON file.
Response: 200 OK, JSON array of items.
GET /about
Returns a simple "About Me" message.
Response: 200 OK, JSON object with message.

POST /items
Creates a new item in the JSON file.
Request Body: JSON object with item data.
Response: 201 Created, JSON array of all items.

PUT /items
Updates an existing item in the JSON file.
Request Body: JSON object with updated item data.
Response: 200 OK, JSON object with updated item.

DELETE /items
Deletes an item from the JSON file.
Request Body: JSON object with item name to delete.
Response: 200 OK, JSON object with success message.
Error Handling
The server returns error responses for the following cases:

404 Not Found: Item not found in JSON file.
405 Method Not Allowed: Invalid HTTP method.
500 Internal Server Error: Server-side error.
Running the Server

Clone the repository and navigate to the project directory.
Run node server.js to start the server.
The server will listen for requests on port 3000.
Example Use Cases
Use a tool like curl or a REST client to test the endpoints.

Send a GET request to http://localhost:3000/items to retrieve the list of items.

Send a POST request to http://localhost:3000/items with a JSON object in the request body to create a new item.

Code Structure
The server code is organized into a single file, server.js. The code uses the http module to create an HTTP server and handle incoming requests. The server uses the fs module to read and write data to the JSON file.

Dependencies
Node.js (built-in http and fs modules)
License
This code is released under the MIT License. -->


# Project Title

A brief description of what this project does and who it's for


## API Reference

#### Get all items

```http
  GET /items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None` | `None` | .No Parameter Required |

>Description: Retrieves a list of all items from the JSON file.
>Response: Returns a JSON array of items with a status code of 200 OK.

#### Get about message

```http
  GET /about
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `None`      | `None` | No Parameter Required|

>Description: Returns a simple "About Me" message.
>Response: Returns a JSON object with a message and a status code of 200 OK.

```http
  POST /items
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`      | `JSON` | Required. item data|

>Description: Adds a new item to the JSON file.
>Request Body: JSON object containing the item data to be added.
>Response: Returns a JSON array of all items with a status code of 201 Created.


```http
  PUT /items
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`      | `JSON` | Required. Updated item data including the name of the item to update

>Description: Updates an existing item in the JSON file based on the item's name.
>Request Body: JSON object containing the updated item data.
>Response: Returns a JSON object with a success message and the updated item with a status code of 200 OK


```http
  DELETE /items
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`      | `JSON` | Required. item name

>Description: Deletes an item from the JSON file based on the item's name.
>Request Body: JSON object containing the name of the item to be deleted.
>Response: Returns a JSON object with a success message with a status code of 200 OK.


Error Responses

404 Not Found: Returned when the requested item or page is not found.
405 Method Not Allowed: Returned when an invalid HTTP method is used.
500 Internal Server Error: Returned when there is a server-side error.

Running the Server

Clone the repository and navigate to the project directory.
Run node server.js to start the server.
The server will listen for requests on port 3000.





