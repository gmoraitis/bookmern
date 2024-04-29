import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateBook from './UpdateBook';




function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => {
        setError('Error fetching books. Please try again.');
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to the update page with book ID
  };


  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Book deleted successfully');
          // Remove the deleted book from the state
          setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
        } else {
          throw new Error('Failed to delete book');
        }
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };
  

  return (
    <div>
      <h1>Books</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(books) && books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => handleUpdate(book._id)}>Update</button>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/add')}>Add a Book</button>
    </div>
  );
}

export default Books;
