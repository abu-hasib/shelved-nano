import React from "react";
import BookList from "../Books.js/BookList";
import PropTypes from "prop-types";

function BookShelf(props) {
  const { label, books, handleChange, handleFocus, value } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{label}</h2>
      <div className="bookshelf-books">
        <BookList
          books={books}
          handleChange={handleChange}
          handleFocus={handleFocus}
          value={value}
        />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  label: PropTypes.string,
  books: PropTypes.array.isRequired,
};

export default BookShelf;
