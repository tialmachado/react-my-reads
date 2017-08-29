import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AlertContainer from 'react-alert';

import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import If from './components/If';
import * as BooksAPI from './api/BooksAPI';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      books: []
    };
  }

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  showAlert = (messageText, messageType) => {
    this.msg.show(messageText, {
      time: 2000,
      type: messageType
    });
  };

  componentDidMount() {
    this.refreshBooks();
  }

  refreshBooks() {
    this.startLoading();
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      this.stopLoading();
    });
  }

  addBook = (book, shelf) => {
    this.startLoading();
    BooksAPI.update(book, shelf).then(book => {
      this.refreshBooks();
      this.showAlert('Done', 'success');
      this.stopLoading();
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="app">
        <If test={loading}>
          <div className="loading">Loading</div>
        </If>
        <AlertContainer ref={msg => (this.msg = msg)} />

        <Route
          exact
          path="/"
          render={() =>
            <ListBooks books={this.state.books} onAddBook={this.addBook} />}
        />
        <Route
          path="/search"
          render={({ history }) =>
            <SearchBooks
              books={this.state.books}
              onAddBook={this.addBook}
              showAlert={this.showAlert}
              startLoading={this.startLoading}
              stopLoading={this.stopLoading}
            />}
        />
      </div>
    );
  }
}

export default App;
