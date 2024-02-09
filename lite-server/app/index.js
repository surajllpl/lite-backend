// Required Modules
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// db config
const sequelize = require('./utils/db');

// Model Routers
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const listingRoutes = require('./routes/listingRoutes');

// Server Creation
const app = express();


app.use(morgan("dev")); // logs
// body-parser is deprecated - we can also use this
// parse requests of content-type - application/json
app.use(express.json()); // body_parser -> converts JSON data
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use((req,res,next)=>{
  res.setHeader("Access-control-Allow-Orgin", "*");
  res.setHeader("Access-control-Allow-Orgin", "GET,POST,PUT,DELETE");
  next();
});


// Routes
app.use('/dev', require('./routes/dev'));
app.use('/api/v1', userRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', enquiryRoutes);
app.use('/api/v1', listingRoutes);

// Initialize Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Sync models with database
    return sequelize.sync(); 
    // This will create tables if they don't exist
  })
  .then(() => {
    console.log('Models have been synchronized with the database.');
    // Start the server
    const PORT = process.env.NODE_DOCKER_PORT || 8081;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });





