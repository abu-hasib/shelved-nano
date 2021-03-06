import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../Books/Book";
import * as booksAPI from "../../BooksAPI";
import { debounce } from "lodash";

class Search extends Component {
  state = {
    query: "",
    results: [],
  };

  onQueryChange = (query) => {
    this.setState(() => ({
      query,
    }));
    this.searchForBooks(query);
  };

  searchForBooks = debounce((query) => {
    return booksAPI.search(query).then((results) => {
      let updatedResults = [];
      let { books } = this.props;

      if (results && results.length > 0) {
        results.map((result) => {
          if (!result.shelf) {
            return (result.shelf = "none");
          }
          return true;
        });

        results.map((result) => {
          return books.map((book) => {
            return result.id === book.id && (result.shelf = book.shelf);
          });
        });
        updatedResults = results.filter(
          (result) => result.imageLinks && result.authors
        );
      }
      this.setState(() => ({
        results: updatedResults,
      }));
    });
  }, 1000);

  render() {
    const { handleChange } = this.props;
    const { query, results } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.onQueryChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query === ""
              ? ""
              : results.length > 0
              ? results.map((book) => (
                  <Book key={book.id} handleChange={handleChange} book={book} />
                ))
              : ""}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
