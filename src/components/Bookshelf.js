import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    const { shelf, books, onAddBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className={['bookshelf-title', shelf.status].join(' ')}>
          {shelf.label} ({books.length})
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  onAddBook={onAddBook}
                  currentShelf={shelf.status}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
