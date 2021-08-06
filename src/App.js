import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./components/BookShelf/BookShelf";
import * as booksAPI from "./BooksAPI";
import Search from "./components/BookShelf/Search";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    const wantToRead = [];
    const currentlyReading = [];
    const read = [];
    booksAPI.getAll().then((books) => {
      books.map((book) => {
        switch (book.shelf) {
          case "wantToRead":
            wantToRead.push(book);
            break;
          case "currentlyReading":
            currentlyReading.push(book);
            break;
          case "read":
            read.push(book);
            break;
          default:
            break;
        }
        return book;
      });
      wantToRead.length > 0 &&
        this.setState(() => ({
          wantToRead,
        }));
      currentlyReading.length > 0 &&
        this.setState(() => ({
          currentlyReading,
        }));
      read.length > 0 &&
        this.setState(() => ({
          read,
        }));
      this.setState(() => ({ books }));
    });
  }

  handleChange = (e, book) => {
    const { value } = e.target;
    const isInCurrentlyReading = findNewBookIndex(
      this.state.currentlyReading,
      book
    );
    const isInWantToRead = findNewBookIndex(this.state.wantToRead, book);
    const isInRead = findNewBookIndex(this.state.read, book);

    switch (value) {
      case "wantToRead":
        if (isInWantToRead < 0) {
          book.shelf = "wantToRead";
          this.setState(() => ({
            wantToRead: [...this.state.wantToRead, book],
          }));
          booksAPI.update(book, "wantToRead").then((res) => {
            return res;
          });
          if (isInRead >= 0) {
            const read = [...this.state.read];
            const updatedBookshelf = read.filter(
              (bookOnShelf) => bookOnShelf.id !== book.id
            );
            this.setState(() => ({
              read: updatedBookshelf,
            }));
          }
          if (isInCurrentlyReading >= 0) {
            const currentlyReading = [...this.state.currentlyReading];
            const updatedBookshelf = currentlyReading.filter(
              (bookOnShelf) => bookOnShelf.id !== book.id
            );
            this.setState(() => ({
              currentlyReading: updatedBookshelf,
            }));
          }
        }
        break;

      case "currentlyReading":
        if (isInCurrentlyReading < 0) {
          book.shelf = "currentlyReading";
          this.setState(() => ({
            currentlyReading: [...this.state.currentlyReading, book],
          }));
          booksAPI.update(book, "currentlyReading").then((res) => {
            return res;
          });
          if (isInRead >= 0) {
            const read = [...this.state.read];
            const updatedBookshelf = read.filter(
              (bookOnShelf) => bookOnShelf.id !== book.id
            );
            this.setState(() => ({
              read: updatedBookshelf,
            }));
          }
          if (isInWantToRead >= 0) {
            const wantToRead = [...this.state.wantToRead];
            const updatedBookshelf = wantToRead.filter(
              (bookOnShelf) => bookOnShelf.id !== book.id
            );
            this.setState(() => ({
              wantToRead: updatedBookshelf,
            }));
          }
        }
        break;
      case "read":
        if (isInRead < 0) {
          book.shelf = "read";
          this.setState(() => ({
            read: [...this.state.read, book],
          }));
          booksAPI.update(book, "read").then((res) => {
            return res;
          });
          if (isInWantToRead >= 0) {
            const wantToRead = [...this.state.wantToRead];
            const updatedBookshelf = wantToRead.filter(
              (bookOnShelf) => bookOnShelf.id !== book.id
            );
            this.setState(() => ({
              wantToRead: updatedBookshelf,
            }));
          }
          if (isInCurrentlyReading >= 0) {
            const currentlyReading = [...this.state.currentlyReading];
            const updatedBookshelf = currentlyReading.filter(
              (bookOnShelf) => bookOnShelf.id !== book.id
            );
            this.setState(() => ({
              currentlyReading: updatedBookshelf,
            }));
          }
        }
        break;
      default:
        console.log("Default");
        break;
    }
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search">
              <Search
                books={this.state.books}
                handleChange={this.handleChange}
              />
            </Route>
            <Route path="/">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf
                      label={"Currently Reading"}
                      books={this.state.currentlyReading}
                      handleChange={this.handleChange}
                    />
                    <BookShelf
                      label={"Want to Read"}
                      books={this.state.wantToRead}
                      handleChange={this.handleChange}
                    />
                    <BookShelf
                      label={"Read"}
                      books={this.state.read}
                      handleChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function findNewBookIndex(bookshelf, book) {
  const newBookIndex = bookshelf.findIndex(
    (bookOnShelf) => bookOnShelf.id === book.id
  );
  return newBookIndex;
}

export default BooksApp;
