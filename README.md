# restApi-simple-note-using-expressjs


## To get the Node server running locally:

 * Clone this repo
 * ```cd restApi-simple-note-using-expressjs```
 * ```npm install```
 * set up file .env and database
 
## To setup .env and database

 * start your mysql server
 * create database 
 * make file ```.env``` 
 * you can imitate ```.env-semple``` 
 
 #### set variables for database connection at ```./config/config.json```
 
 ```
 "username": "your-username-mysql",
 "password": "your-password-mysql"
 "database": "name-your-database",
 "host": "127.0.0.1",

 ```

 * ```sequelize db:migrate```
 
 import dump data from ```./dumping-data.sql``` to your database
 
 * ```npm start``` 

## To test request API

 * open postman
 * import from ```./test``` to your postman
 * test request
