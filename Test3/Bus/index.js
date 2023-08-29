// 1. Create a bus reservation system following the MVC Architecture which should have the following
// features:
// ● User registration and login feature.
// ● Hashing the users passwords using bcrypt
// ● Users can see the list of buses available along with their prices.
// ● Users can book the available bus.
// ● Users can view their dashboard which shows their bookings.
// ● The booking of the users should automatically expire from the system once the booking date exceeds
// ● Once the users book the bus, the data should be stored in the database.
// ● Note: Use mongoose for working with database
// ● Use EJS template for front-end


const express= require('express');


const app = express();





app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });


