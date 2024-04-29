import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBook() {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/books/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        return response.json();
      })
      .then(data => {
        setBook(data);
        setTitle(data.title);
        setAuthor(data.author);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author })
    })
      .then(response => {
        if (response.ok) {
          console.log('Book updated successfully');
          navigate('/'); // Navigate back to the main page after successful update
        } else {
          throw new Error('Failed to update book');
        }
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default UpdateBook;
