/**
 * ******************************************************************************** 
 * ITE5315 – Assignment 4* 
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.*
 * No part of this assignment has been copied manually or electronically from any other source* 
 * (including web sites) or distributed to other students.*
 * * Name: _Harmandeep Kaur_ Student ID: _N01616566_ Date: _26-11-2023_*
 * *********************************************************************************/



const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const database = require('./config/database');
const Employee = require('./models/carsales');
//const Invoice = require('./models/employee');

const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(database.myurl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Handlebars configuration
const hbs = exphbs.create();

app.engine('.hbs', exphbs.engine({
    extname:'.hbs',
  defaultLayout: 'main',
  runtimeOptions: { allowProtoPropertiesByDefault: true, allowedProtoMethodsByDefault: true },
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views/partials'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
const jsonData = fs.readFileSync('./CarSales.json', 'utf-8');

// Routes
app.get('/all', (req, res) => {
  res.render('index', { title: 'Assignment 4' });
});

// Route to display filtered invoices based on Sales_in_thousands
app.get('/highSalesInvoices', async (req, res) => {
    try {
      const threshold = 500; // Set your desired threshold for Sales_in_thousands
      const invoices = await Employee.find({ Sales_in_thousands: { $gt: threshold } });
      res.render('highSalesInvoices', { invoices });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

app.get('/', async (req, res) => {
  try {
    //const invoices = await Invoice.find();
    const invoices = require('./CarSales.json');
    res.render('allInvoices', { invoices: require('./CarSales.json')});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/insertInvoice', async (req, res) => {
  try {
    const newInvoice = await Employee.create(req.body);
    res.render('insertInvoice', { insert });
    res.redirect('/allInvoices');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/deleteInvoice/:invoice_id', async (req, res) => {
    const id = req.params.invoice_id;
  
    try {
      const deletedInvoice = await Employee.findByIdAndDelete(id);
  
      if (deletedInvoice) {
        res.render('deleteInvoice'); // Render the 'deleteInvoice.hbs' view after deletion
      } else {
        res.status(404).send('Invoice not found');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Route to render the delete form
  app.get('/delete/:invoice_id', async (req, res) => {
    const id = req.params.invoice_id;
  
    try {
      const invoice = await Employee.findById(id);
  
      if (invoice) {
        res.render('delete', { invoice }); // Pass the invoice data to the 'delete.hbs' view
      } else {
        res.status(404).send('Invoice not found');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

// Additional routes...

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
