// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Show all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Show a specific book
router.get('/books/:book_id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.book_id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Insert a new book
router.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an existing book
router.delete('/books/:book_id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.book_id);
    if (!deletedBook) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json({ message: 'Book successfully deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update "Manufacturer" & “price_in_thousands” of an existing book
router.put('/books/:book_id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.book_id,
      {
        ISBN: req.body.ISBN,
        img: req.body.img,
        title: req.body.title,
        author: req.body.author,
        inventory: req.body.inventory,
        category: req.body.category,
      },
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(updatedBook);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
