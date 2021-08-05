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
    booksAPI.search(query).then((results) => {
      if (results && results.length > 0) {
        results.map((result) => (result.shelf = "none"));
      }
      this.setState(() => ({
        results,
      }));
    });
  }, 1000);

  render() {
    const { books, handleChange } = this.props;
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

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

export default Search;
