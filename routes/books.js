var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var credentials = require('../bin/credentials');
var Books = require('../models/books.js');

mongoose.connect('mongodb://localhost/books')

router.route('/')
  .all((req, res, next) => {
    next();
  })

  .get((req, res) => {
    Books.find(function(err, books) {
      if (err) return res.send(err);
      res.json(books);
    });
  })

  .post((req, res) => {
    let newBook = new Books(req.body);

    newBook.save((err, book) => {
      if (err) return res.send(err);
      res.json({ message: 'Book successfully added!', book })
    })
  });

router.route('/:id')
  .all((req, res, next) => {
    next();
  })

  .get((req, res) => {
    Books.findById(req.params.id, (err, book) => {
      if (err) return res.send(err);
      res.json(book);
    });
  })

  .patch((req, res) => {
    Books.findById(req.params.id, (err, book) => {
      if (err) return res.send(err);
      Object.assign(book, req.body).save((err, book) => {
        if (err) res.send(err);
        res.json({ message: 'Book successfully updated!', book })
      })
    });
  })

  .delete((req, res) => {
    Books.remove({_id: req.params.id}, (err, result) => {
      if (err) return res.send(err);
      res.json({ message: 'Book successfully deleted!', result })
    });
  });

module.exports = router;
