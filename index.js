//ques 2 book_dataset

const mongoose = require('mongoose');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var database = require('./config/database');
const Book = require('./models/book'); // Adjust the path based on your project structure
const app = express();
const port = process.env.PORT || 8000;


//
mongoose.connect(database.url);

// Read the data from the JSON file

const jsonData = fs.readFileSync('./book_dataset.json', 'utf-8');
const booksData = JSON.parse(jsonData);
console
// Function to insert data into MongoDB
async function insertData() {
  try {
    // Insert each book into the MongoDB collection
    for (const book of booksData) {
      await Book.create(book);
    }
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the function to insert data
insertData();
console.log(`Server started on port ${port}`);
/* mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

 */