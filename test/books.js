process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Books = require('../models/books');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  beforeEach((done) => {
    Books.remove({}, (err) => {
      done();
    });
  });

  describe('/GET books', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
      .get('/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  describe('/POST books', () => {

    it('it should Post a book', (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 100
      };
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully added!');
          res.body.book.should.have.property('title');
          res.body.book.should.have.property('author');
          res.body.book.should.have.property('pages');
          res.body.book.should.have.property('year');
          done();
      });
    });

    it('it should not Post a book without title field', (done) => {
      let book = {
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 100
      };
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.have.property('kind').eql('required');
          done();
      });
    });

    it('it should not Post a book without author field', (done) => {
      let book = {
        title: "The Lord of the Rings",
        year: 1954,
        pages: 100
      };
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('author');
          res.body.errors.author.should.have.property('kind').eql('required');
          done();
      });
    });

    it('it should not Post a book without year field', (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        pages: 100,
      };
      chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('year');
        res.body.errors.year.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should not Post a book without pages field', (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954
      };
      chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('pages');
        res.body.errors.pages.should.have.property('kind').eql('required');
        done();
      });
    });

  });

  describe('/GET/:id books', () => {
    it('it should GET a book by the given id', (done) => {
      let book = new Books({
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1170
      });
      book.save((err, book) => {
        chai.request(server)
        .get('/books/' + book.id)
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('pages');
          res.body.should.have.property('year');
          res.body.should.have.property('_id').eql(book.id);
          done();
        });
      });
    });
  });

  describe('/PATCH/:id books', () => {

    it('it should UPDATE a book given the id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .patch('/books/' + book.id)
        .send({
          title: "Chronicles of Narnia",
          author: "M.S. Lewis",
          year: 1940,
          pages: 1500
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully updated!');
          res.body.book.should.have.property('title').eql('Chronicles of Narnia');
          res.body.book.should.have.property('author').eql('M.S. Lewis');
          res.body.book.should.have.property('year').eql('1940');
          res.body.book.should.have.property('pages').eql('1500');
          done();
        });
      });
    });

    it('it should UPDATE a book title given the id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .patch('/books/' + book.id)
        .send({
          title: "Chronicles of Narnia",
          author: "C.S. Lewis",
          year: 1948,
          pages: 778
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully updated!');
          res.body.book.should.have.property('title').eql('Chronicles of Narnia');
          done();
        });
      });
    });

    it('it should UPDATE a book author given the id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .patch('/books/' + book.id)
        .send({
          title: "The Chronicles of Narnia",
          author: "M.S. Lewis",
          year: 1948,
          pages: 778
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully updated!');
          res.body.book.should.have.property('author').eql('M.S. Lewis');
          done();
        });
      });
    });

    it('it should UPDATE a book year given the id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .patch('/books/' + book.id)
        .send({
          title: "The Chronicles of Narnia",
          author: "C.S. Lewis",
          year: 1940,
          pages: 778
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully updated!');
          res.body.book.should.have.property('year').eql('1940');
          done();
        });
      });
    });

    it('it should UPDATE a book pages given the id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .patch('/books/' + book.id)
        .send({
          title: "The Chronicles of Narnia",
          author: "C.S. Lewis",
          year: 1948,
          pages: 1500
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully updated!');
          res.body.book.should.have.property('pages').eql('1500');
          done();
        });
      });
    });

    it('it should return an error given an invalid id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .patch('/books/57c288955926ac8c1c3ac9f')
        .send({
          title: "The Chronicles of Narnia",
          author: "C.S. Lewis",
          year: 1948,
          pages: 1500
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('CastError');
          res.body.should.have.property('kind').eql('ObjectId');
          res.body.should.have.property('value').eql('57c288955926ac8c1c3ac9f');
          res.body.should.have.property('path').eql('_id');
          done();
        });
      });
    });

  });

  describe('/DELETE:id books', () => {

    it('it should delete a book given an id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .delete('/books/' + book.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully deleted!');
          res.body.result.should.have.property('ok').eql(1);
          res.body.result.should.have.property('n').eql(1);
          done();
        });
      });
    });

    it('it should return an error given an invalid id', (done) => {
      let book = new Books({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      });
      book.save((err, book) => {
        chai.request(server)
        .delete('/books/57c288955926ac8c1c3ac9f')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('CastError');
          res.body.should.have.property('kind').eql('ObjectId');
          res.body.should.have.property('value').eql('57c288955926ac8c1c3ac9f');
          res.body.should.have.property('path').eql('_id');
          done();
        });
      });
    });

  });

});
