import React from "react";
import BookList from "../Books.js/BookList";

function BookShelf(props) {
  const { label } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{label}</h2>
      <div className="bookshelf-books">
        <BookList />
      </div>
    </div>
  );
}

export default BookShelf;
