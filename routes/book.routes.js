const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

const router = require("express").Router();

router.get("/books", (req, res, next) => {
  // if(req.query.bookSearch) {}

  Book.find()
    .populate("author")
    .then((booksFromDB) => {
      const data = {
        booksArr: booksFromDB,
      };
      res.render("books/books-list", data);
    })
    .catch((error) => {
      console.log("Error getting authors from DB", error);
      next(error);
    });
});

router.get("/books/create", (req, res) => {
  Author.find()
    .then((authorsFromDB) => {
      res.render("books/book-create", {authorsFromDB});
    })
    .catch((error) => {
      console.log("Error getting books from DB", error);
      next(error);
    });
});

router.post("/books/create", (req, res) => {
  const bookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  };
  Book.create(bookDetails)
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      console.log("Error creating book in the DB", err);
      next(err);
    });
});

router.get("/books/:bookId/edit", (req, res) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((bookDetails) => {
      res.render("books/book-edit", bookDetails);
    })
    .catch((error) => {
      console.log("Error getting book details from DB", error);
      next(error);
    });
});

router.post("/books/:bookId/edit", (req, res) => {
  const bookId = req.params.bookId;

  const newBookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  };
  console.log(newBookDetails);

  Book.findByIdAndUpdate(bookId, newBookDetails)
    .then(() => {
      // res.redirect("/books");
      res.redirect(`/books/${bookId}`); // redirect to book details page
    })
    .catch((error) => {
      console.log("Error updating book in DB", error);
      next(error);
    });
});

router.get("/books/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .populate("author")
    .then((bookDetails) => {
      res.render("books/book-details", bookDetails);
    })
    .catch((error) => {
      console.log("Error getting authors from DB", error);
      next(error);
    });
});

router.post("/books/:bookId/delete", (req, res) => {
  const { bookId } = req.params;

  Book.findByIdAndRemove(bookId)
    .then(() => {
      res.redirect("/books");
    })
    .catch((error) => {
      console.log("Error deleting book from DB", error);
      next(error);
    });
});

module.exports = router;
