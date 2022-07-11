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
  // console.log(req.body.title);
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

router.get("/books/:bookId/edit", (req, res) => {
  const {bookId} = req.params;

  Book.findById(bookId)
    .then( (bookDetails) => {
      res.render("books/book-edit", bookDetails);
    })
    .catch( (error) => {
      console.log("Error getting book details from DB", error);
      next(error);
    })

});

router.post("/books/:bookId/edit", (req, res) => {
  const bookId = req.params.bookId;

  const newBookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating
  }
  console.log(newBookDetails)

  Book.findByIdAndUpdate(bookId, newBookDetails)
  .then( () => {
    // res.redirect("/books");
    res.redirect(`/books/${bookId}`); // redirect to book details page
  })
  .catch( (error) => {
    console.log("Error updating book in DB", error);
    next(error);
  })
});



router.get("/books/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId).then((bookDetails) => {
    res.render("books/book-details", bookDetails);
  });
});

router.post("/books/:bookId/delete", (req, res) => {
  const {bookId} = req.params;

  Book.findByIdAndRemove(bookId)
    .then( () => {
      res.redirect('/books');
    })
    .catch( (error) => {
      console.log("Error deleting book from DB", error);
      next(error);
    })

})

module.exports = router;
