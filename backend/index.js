const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// nano.db.create('alice');
// ****const database = nano.db.use('restaurant_db');
// const alice = nano.db.use('alice');

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

    
//Set views property and views engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


//When user hits the home page, then the message prints in browser.
app.get('/', (request, response) => response.render("index", {
    message: "Welcome to express and ejs 'Hello World' application"
   })
  );
// console.log(database);

  // Include the menu route
const menuRoute = require('./routes/menu');
const orderRoute = require('./routes/order');
const cusRoute = require('./routes/customer');
const employeeRoute = require('./routes/employee');
const inventoryRoute = require('./routes/inventory');
const tableRoute = require('./routes/table');
const reservationRoute = require('./routes/reservation');

app.use('/menu', menuRoute);
app.use('/order', orderRoute);
app.use('/customer', cusRoute);
app.use('/employee', employeeRoute);
app.use('/inventory', inventoryRoute);
app.use('/table', tableRoute);
app.use('/reservation', reservationRoute);

app.listen(3000, function(){
    console.log('Server started on port 3000');
})
