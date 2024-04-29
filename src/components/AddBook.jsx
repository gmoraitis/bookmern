import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null); // New state for handling errors

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add book: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(() => {
      console.log('Book added successfully');
      navigate('/');
    })
    .catch(error => {
      setError('Error adding book: ' + error.message);
      console.error('Error adding book:', error);
    });
  };
  

  return (
    <div>
      <h1>Add Book</h1>
      {error && <p>{error}</p>} {/* Display error message if error is not null */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <button type="submit">Add Book</button>
      </form>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default AddBook;
