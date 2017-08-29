import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import * as BookshelfType from './BookshelfType';

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentShelf: props.currentShelf || 'none',
      rating: this.getRating()
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setRating(nextValue);
  }

  getRating() {
    return localStorage.getItem(`rating-${this.props.book.id}`) || 0;
  }

  setRating(rating) {
    localStorage.setItem(`rating-${this.props.book.id}`, rating);
    this.setState({ rating });
  }

  onChangeBookshelf(e) {
    let currentShelf = e.target.value;
    this.props.onAddBook(this.props.book, currentShelf);
    this.setState({ currentShelf });
  }

  render() {
    const { currentShelf, rating } = this.state;
    const { book } = this.props;
    const authors = book.authors ? book.authors.join(', ') : [];
    const cover =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : '';
    const shelfs = BookshelfType.getAll();

    return (
      <div className="book">
        <div className="book-top">
          <div
            className={['book-cover', currentShelf].join(' ')}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${cover}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={currentShelf}
              onChange={e => {
                this.onChangeBookshelf(e);
              }}
            >
              <option value="none" disabled>
                Move to...
              </option>
              {shelfs.map(bookshelf =>
                <option key={bookshelf.status} value={bookshelf.status}>
                  {bookshelf.label}
                </option>
              )}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {authors}
        </div>
        <div className="book-rating">
          <StarRatingComponent
            name={`rating-${book.id}`}
            value={parseFloat(rating)}
            onStarClick={e => {
              this.onStarClick(e);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Book;
