import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./components/BookShelf/BookShelf";

const currentReads = [
  {
    url:
      "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    id: 100,
  },
  {
    url:
      "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
    author: "Orson Scott Card",
    title: "Ender's Game",
    id: 101,
  },
];

const toRead = [
  {
    url:
      "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
    author: "David McCullough",
    title: "1776",
    id: 103,
  },
];

const read = [
  {
    url:
      "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
    author: "J.R.R. Tolkien",
    title: "The Hobbit",
    id: 104,
  },
  {
    url:
      "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
    author: "Seuss",
    title: "Oh, the Places You'll Go!",
    id: 105,
  },
  {
    url:
      "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
    author: "Mark Twain",
    title: "The Adventures of Tom Sawyer",
    id: 106,
  },
];

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
    currentlyReading: currentReads,
    wantToRead: toRead,
    read,
    value: "none",
  };

  handleFocus = (e) => {
    const { value } = e.target.value;
    switch (value) {
      case "wantToRead":
        this.setState(() => ({}));

        break;

      default:
        break;
    }
  };

  handleChange = (e, book) => {
    const { value } = e.target;

    const isInCurrentlyReading = findNewBookIndex(
      this.state.currentlyReading,
      book
    );
    const isInWantToRead = findNewBookIndex(this.state.wantToRead, book);
    const isInRead = findNewBookIndex(this.state.read, book);

    console.log(`Read:  ${isInRead}`);

    switch (value) {
      case "wantToRead":
        if (isInWantToRead < 0) {
          this.setState(() => ({
            wantToRead: [...this.state.wantToRead, book],
          }));
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
          this.setState(() => ({
            currentlyReading: [...this.state.currentlyReading, book],
          }));
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
          this.setState(() => ({
            read: [...this.state.read, book],
          }));
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
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
                  handleFocus={this.handleFocus}
                  value={this.state.value}
                />
                <BookShelf
                  label={"Want to Read"}
                  books={this.state.wantToRead}
                  handleChange={this.handleChange}
                  handleFocus={this.handleFocus}
                  value={this.state.value}
                />
                <BookShelf
                  label={"Read"}
                  books={this.state.read}
                  handleChange={this.handleChange}
                  handleFocus={this.handleFocus}
                  value={this.state.value}
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
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
