import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function BookList(props) {
  const { books, handleChange } = props;
  return (
    <ol className="books-grid">
      {books.length > 0
        ? books.map((book) => (
            <Book key={book.title} book={book} handleChange={handleChange} />
          ))
        : ""}
    </ol>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BookList;
