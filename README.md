### CarCar

Team:

* Rosanna Wyatt - Auto Services
* Amanda Gifford - Auto Sales

## Getting Started

**Make sure you have Docker, Git and Node.js 18.2 or above**

1. First, please fork this repository.

2. Second, please clone the forked repository onto your local computer: git clone <<repository.url.here>>

3. Third, please build and run the project using Docker with the following commands:

``` docker volume create two-shot-pgdata
    docker-compose build
    docker-compose up ```

* After running these commands, make sure all of the Docker containers are running

* View the project in the browser at http://localhost:3000/

## Design

CarCar is made up of 3 microservices which are dependent on one and other:

![CarCar] (excalidraw.png)

** Integration - How our microservices work together to maintain the application

Our Sales and Service domains work together with our Inventory domain to make everything in the CarCar application work seamlessly.

In our application, the inventory domain acts as the root domain for keeping track of the automobiles that are on our lot and are available to purchase. Our sales and service microservices obtain information from the inventory domain through **polling**, which is a process within which the inventory domain will send data about the automobile inventory to each of the sales and services microservices. Both of these microservices are then able to regularly update their own internal database with the latest data from the inventory application.

## Accessing Endpoints to Send and View Data (Accessible Through Insomnia & the Browser)

## Inventory

# Manufacturers:

From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

![Manufacturer's Endpoints] (manufacturers_endpoints.png)

Creating and updating a manufacturer requires only the manufacturer's name.

**{
  "name": "Chrysler"
}**

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

**{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}**

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

**{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}**

# Vehicle Models:

From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

! [Vehicle Models Endpoints] (vehicleModels.png)

Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.

**{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}**

Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.

**{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}**

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

**{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}**

Getting a list of vehicle models returns a list of the detail information with the key "models".

**{
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
}**

# Automobile Information

From Insomnia and your browser, you can access the automobile endpoints at the following URLs.

Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.

! [Automobile Endpoints] (Automobiles.png)

You can create an automobile with its color, year, VIN, and the id of the vehicle model.

**{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}**

As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

**{
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
}**

You can update the color, year, and sold status of an automobile.

**{
  "color": "red",
  "year": 2012,
  "sold": true
}**

Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

**{
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
}**


## Sales

In the sales microservice, there are four models: AutomobileVO, Customer, Salesperson, and Sale. The first three mentioned all send data to the view that creates a new sale in order to create a new Sale object.

The AutomobileVO is a value object and is constantly polling the inventory api database through the implementation of a poller and therefor has up-to-date data on the automobiles inventory to the second.



* Service

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
