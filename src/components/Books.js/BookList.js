import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function BookList(props) {
  const { books } = props;
  console.log(books);
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <Book key={book.title} book={book} />
      ))}
    </ol>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BookList;
