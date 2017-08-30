import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BookshelfType from '../enum/BookshelfType';

const ListBooks = ({ books, onAddBook }) => {
  const shelfs = BookshelfType.getAll();
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.map(shelf => (
            <Bookshelf
              key={shelf.status}
              shelf={shelf}
              onAddBook={onAddBook}
              books={books.filter(book => book.shelf === shelf.status)}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
