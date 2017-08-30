import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';

import * as BooksAPI from '../api/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: ''
    };
  }

  updateQuery = query => {
    this.setState({ query });
    this.props.startLoading();
    BooksAPI.search(query).then(
      results => {
        if (results && results.error) {
          this.props.showAlert(results.error, 'error');
          this.setState({ results: [] });
        } else if (results && Array.isArray(results)) {
          this.setState({ results });
        } else {
          this.setState({ results: [] });
        }
        this.props.stopLoading();
      },
      error => {
        this.props.stopLoading();
      }
    );
  };

  getCurrentShelf(book) {
    const foundBook = this.props.books.find(mybook => mybook.id === book.id);
    return foundBook ? foundBook.shelf : 'none';
  }

  render() {
    const { query, results } = this.state;
    const { onAddBook } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={3}
              debounceTimeout={500}
              value={query}
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onAddBook={onAddBook}
                  currentShelf={this.getCurrentShelf(book)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
