import React from "react";
import BookList from "../Books/BookList";
import PropTypes from "prop-types";

function BookShelf(props) {
  const { label, books, handleChange } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{label}</h2>
      <div className="bookshelf-books">
        <BookList books={books} handleChange={handleChange} />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  label: PropTypes.string,
  books: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BookShelf;
