const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookbyid,
} = require("../controllers/book-controller");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

const { UserModel, BookModel } = require("../models/index");

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by their id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getSingleBookById);

/**
 * Route: /books
 * Method: GET
 * Description: Getting all books
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllBooks);

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /
 * Method: POST
 * Description: Adding a New Book
 * Access: Public
 * Parameters: None
 * Data : id, name, genre, price, publisher, author
 */

router.post("/", addNewBook);

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a Book By Its ID
 * Access: Public
 * Parameters: Id
 * Data : id, name, genre, price, publisher, author
 */

router.put("/updateBook/:id", updateBookbyid);

module.exports = router;
