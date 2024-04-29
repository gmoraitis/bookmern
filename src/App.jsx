// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import './App.css';
import Books from './components/Books';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook'

function App() {
  return (
    <Router> {/* Wrap your Routes inside a Router component */}
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/update/:id" element={<UpdateBook />} />
      </Routes>
    </Router>
  );
}

export default App;
