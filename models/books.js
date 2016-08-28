let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema definition
let BooksSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: String, required: true, min: 1},
    pages: { type: String, required: true },
    createdAt: { type: Date, default: Date.now}
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
BooksSchema.pre('save', (next) => {
  let now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('books', BooksSchema);
