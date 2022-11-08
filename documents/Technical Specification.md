# Santa Clock

## Technical Specification

written by: Théo Diancourt 
the 2022-10-8

### Introduction

The goal of the project is to make a prediction of Santa's location based on the current time and the time zone of the user. The project will be implemented using the following technologies:
- Node (JavaScript)
- Docker (Containerization)
- Kubernetes (Orchestration)

#### Why this project?

The project is a fun way to learn about the technologies listed above. It is also a good way to know when Santa will precisely come to your house.

The project need to be finished by the 15th of December 2022.

### Software

The software will be implemented using Node. The software will be packaged in a Docker container. The software will be deployed to a Kubernetes cluster.

### Risks and Assumptions

There is a risk about giving the wrong location of Santa. Or to give the good location but at the wrong time. 

There is another problem about the timestamp. The timestamp will not be based on the time zone of the user. It will be based on the position of the sun so depending on where the user is, the exact moment when Santa will come will be different even if 2 users are in the same time zone.

There is a risk about the peak load of the software. Since will probably not be able to change the server where the software will run, we need to be sure that there will be enough resources to handle the peak load and also check what is the peak load.

### Testing

The software will be tested using the following technologies:
- Mocha (unit testing)
- Postman (API testing)

We are going to test the peak load of the server with 2 different approaches:
- Load testing multiples users at the same time with JMeter
- Load testing complex operations to simulate numerous users 

### Deployment

This project need to be deployed with docker also we want to have as many users as possible so we will use Kubernetes to deploy the application in the most efficient way.

The website will be hosted on a physical server with a static IP address and the following domain name: santaclock.com.

#### Kubernetes

The part of kubernetes in this project is to scale the application to have as many users as possible. We are going to be able to manage the scaling of the application depending on the load of the server.

#### Docker

The part of docker in this project is to package the application in a container. With this technology we will be able to deploy the application in any environment. And in this case on a Kubernetes cluster to a physical server. 

### Monitoring

The monitoring of the application will be done using the following technologies:
- Prometheus (Metrics)
- Grafana (Dashboard)

#### Prometheus

The part of Prometheus in this project is to collect metrics from the application. With this technology we will be able to monitor the application and see if there is any problem.

### Website

The goal of the website is to display and give a precise location of Santa claus (and his reindeers) based on the current time and the time zone of the user. The website should be responsive, work on all devices, and be really easy to use.

#### Frontend

The design of the website will be done in a flat design and with only one page. (Maybe a second page if the need were to arise) and a dashboard to display the activity of the application. 

The website will have the following features:
- Display the current time of the user
- Display the precise time when Santa Claus will be at the user's location
- Put an input for the user to enter his postal adress and thus be able to have the most accurate prediction
- Display the location of Santa Claus on a map
- Display the location of the reindeers on a map
- Responsive design
- The time will be displayed in a format like this (DD:HH:MM:SS)

[Mockup]() <!-- Insert mockup here -->

#### Backend

We are planning to use an API to get the coordinates of the user's location. We will use the following API: https://nominatim.openstreetmap.org/ to get the coordinates of the user's location by entering his postal adress.

A database is not needed for this project because we are not going to store any data. 

### Footnotes

node: Node is a JavaScript runtime built on Chrome's V8 JavaScript engine.

docker: Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

kubernetes: Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.

mocha: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple.

postman: Postman is a collaboration platform for API development.

jmeter: Apache JMeter may be used to test performance both on static and dynamic resources, Web dynamic applications.

prometheus: Prometheus is an open-source systems monitoring and alerting toolkit.

grafana: Grafana is an open-source platform for monitoring and observability.

responsive design: Responsive web design is an approach to web design aimed at building an optimal viewing experience for users across a wide range of devices (from desktop computer monitors to mobile phones).
