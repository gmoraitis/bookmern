const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;



// Allow requests from all origins
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

// Get book details by ID
app.get('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.send(book);
    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).send('Error fetching book details');
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Connect to MongoDB: Add code to connect to MongoDB using Mongoose:
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



// 7. Set up CRUD routes: Create routes for CRUD operations on books. Add these routes to server.js:
const Book = require('./models/Book');

// Create a book
app.post('/api/books', async (req, res) => {
try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
} catch (error) {
    res.status(400).send(error);
}
});

// Read all books
app.get('/api/books', async (req, res) => {
try {
    const books = await Book.find({});
    res.send(books);
} catch (error) {
    res.status(500).send(error);
}
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
    return res.status(404).send();
    }
    res.send(book);
} catch (error) {
    res.status(400).send(error);
}
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
    return res.status(404).send();
    }
    res.send(book);
} catch (error) {
    res.status(500).send(error);
}
});
