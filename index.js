//main entry point for the server
//import express server and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//set up port and app
const PORT = 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//connect to the database and server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Social Network API running on port ${PORT}!`);
  });
});