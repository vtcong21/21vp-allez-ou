## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is about a tour management web system.
Inside there are two servers: a server for the web and a mini server for the payment system. 
	
## Technologies
Project is written in JavaScript with: Nodejs, MongoDB, Express.js, and EJS.

## Setup
To run this project, you will need to add the .config file to the `server` and `payment-server` folder, here's the file:
```
DB_URI=
PORT=
EMAIL_SERVICE=
EMAIL_USERNAME=
EMAIL_PASSWORD=
```
After that, run both servers by npm.
### Payment server setup
```
cd ./payment-server
npm i
npm start
```
### Web server setup
```
cd ./server
npm i
npm start
```


