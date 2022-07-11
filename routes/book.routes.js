const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/books", (req, res, next) => {
  // if(req.query.bookSearch) {}

  Book.find()
    .then((booksFromDB) => {
      const data = {
        booksArr: booksFromDB,
      };
      res.render("books/books-list", data);
    })
    .catch((error) => {
      console.log("Error getting data from DB", error);
      next(error);
    });
});

router.get("/books/create", (req, res) => {
  res.render("books/book-create");
});

router.post("/books/create", (req, res) => {
  console.log(req.body.title);
  const bookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating
  }
  Book.create(bookDetails)
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      console.log("Error creating book in the DB", err);
      next(err);
    })

});

router.get("/books/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId).then((bookDetails) => {
    res.render("books/book-details", bookDetails);
  });
});

module.exports = router;
