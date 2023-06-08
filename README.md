### CarCar

Team:

* Rosanna Wyatt - Auto Services
* Amanda Gifford - Auto Sales

## Getting Started

**Make sure you have Docker, Git and Node.js 18.2 or above**

1. First, please fork this repository.

2. Second, please clone the forked repository onto your local computer: git clone <<repository.url.here>>

3. Third, please build and run the project using Docker with the following commands:

```
    docker volume create two-shot-pgdata
    docker-compose build
    docker-compose up
```

* After running these commands, make sure all of the Docker containers are running

* View the project in the browser at http://localhost:3000/

## Design

CarCar is made up of 3 microservices which are dependent on one and other:

![CarCar](excalidraw.png)

**Integration - How our microservices work together to maintain the application**

Our Sales and Service domains work together with our Inventory domain to make everything in the CarCar application work seamlessly.

In our application, the inventory domain acts as the root domain for keeping track of the automobiles that are on our lot and are available to purchase. Our sales and service microservices obtain information from the inventory domain through **polling**, which is a process within which the inventory domain will send data about the automobile inventory to each of the sales and services microservices. Both of these microservices are then able to regularly update their own internal database with the latest data from the inventory application.

# Inventory

## Manufacturers:

From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/

Creating and updating a manufacturer requires only the manufacturer's name.

```
{
  "name": "Chrysler"
}
```

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

## Vehicle Models:

From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

Getting a list of vehicle models returns a list of the detail information with the key "models".

```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

## Automobiles

From Insomnia and your browser, you can access the automobile endpoints at the following URLs.

**Note:** The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/


You can create an automobile with its color, year, VIN, and the id of the vehicle model.

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```

You can update the color, year, and sold status of an automobile.

```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```

Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```


## Sales

In the sales microservice, there are four models: AutomobileVO, Customer, Salesperson, and Sale. The first three mentioned all send data to the view that creates a new sale in order to create a new Sale object.

The AutomobileVO is a value object and is constantly polling the inventory api database through the implementation of a poller and therefor has up-to-date data on the automobiles inventory to the second.

## Accessing Endpoints to Send and View Data through Insomnia:

### Customers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Delete a customer | DELETE | http://localhost:8090/api/customers/id/delete

To create a Customer, send this JSON Body:

```
{
	"name": "Jamie Foxx",
	"address": "1585 Strawsbury Way",
	"phone_number": 2158907654
}
```

Return value of a created customer:

```
{
	"id: 11,
	"name": "Britney Spears",
	"address": "1314 Maple Ave",
	"phone_number": 9201987648
}
```

Return value of customer list:

```
{
	"customers": [
		{
			"id": 1111,
			"name": "Robert Andre",
			"address": "1585 Suez Street",
			"phone_number": "3124536789"
		},
		{
			"id": 888,
			"name": "Bob Barker",
			"address": "1333 Banbury Way",
			"phone_number": "6782345746"
		}
	]
}
```

### Salespeople:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/delete
​
To create a salesperson, send this JSON body:

```
{
	"name": "Sparky Robbins",
	"employee_id": "11"
}
```

Return value of creating a salesperson:

```
{
	"id": 1,
	"name": "Liz",
	"employee_number": 1
}
```

List all salespeople return value:

```
{
	"salespeople": [
		{
			"id": 1,
			"name": "Jane Doe",
			"employee_number": 1
		}
	]
}
```

### Record of Sales:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/sales/
| Create a new sale | POST | http://localhost:8090/api/sales/
| Delete a sale | DELETE | http://localhost:8090/api/sale/id/delete/

List all sales return value:

```
{
	"sales": [
		{
		 "automobile": {
			  "vin": :"Ed23456Y",
        "import_id": 3,
				"sold": false
			},
			"salesperson": {
				"id": 11,
				"name": "Robert",
				"employee_number": 5
			},
			"customer": {
				"name": "Amanda Gifford",
				"address": "2987 Rolly Way",
				"phone_number": "4523478711"
			},
         "id": 11
		}
	]
}
```

Create a new sale:

```
  {
	"id": 44,
	"price": 88888,
	"vin": {
		"vin": "2922200198"
	},
	"salesperson": {
		"id": 11,
		"name": "Tobin",
		"employee_number": 3
	},
	"customer": {
		"id",
		"name": "Gary Gifford",
		"address": "1549 Bend Way",
		"phone_number": "3490002361"
	}
}
```

Show a salesperson's salesrecord return value:

```
{
	"price": 888888,
	"vin": {
		"vin": "239085647"
	},
	"salesperson": {
		"id": 11,
		"name": "Dalton",
		"employee_number": 11
	},
	"customer": {
		"id",
		"name": "Sam Rollings",
		"address": "2987 Luis St",
		"phone_number": "4156785678"
  },
    "id": 111
  }
  ```
## Service microservice

Explain your models and integration with the inventory
microservice, here.
