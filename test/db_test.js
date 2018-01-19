const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const db = require('../db/db.js')

// test database is bookstore_test -- see package.json

describe('Sanity test', () => {
  it('true should be true', () => {
    expect(true).to.be.true
  })
})

describe('Mocha', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok
  })
})

// There are tests for creating to do list items.
describe('db.createTask(task, tags)', function(){
  const task = {
    task: 'test',
    note: 'test',
    priority: 2,
    userId: 1
  }
  const tags = ['job', 'product']
  it('should be a function', function(){
    expect(db.createTask).to.be.a('function')
  })
  it('should return an array', function(){
    const newTags = db.createTask(task, tags)
    return expect(newTags).to.eventually.be.an('array')
  })
})

// There are tests for completing to do list items.
// There are tests for editing to do list items.
describe('db.updateTask(task)', function(){
  it('should be a function', function(){
    expect(db.updateTask).to.be.a('function')
  })
  it('should return an object', function(){
    const updatedTask = db.updateTask('update', 'update', 3, '1995-12-17', false, 2)
    return expect(updatedTask).to.eventually.be.an('object')
  })
  it('should be able to mark an item completed', function(){
    const updatedTask = db.updateTask('done', 'done', 4, '2017-12-17', true, 2)
    return expect(updatedTask).to.eventually.be.an('object')
  })
})

// There are tests for deleting to do list items.
describe('db.deleteTask(id)', function(){
  it('should be a function', function(){
    expect(db.deleteTask).to.be.a('function')
  })
  it('should return an object', function(){
    const deletedTask = db.deleteTask(2)
    return expect(deletedTask).to.eventually.be.an('object')
  })
})
// describe('db.createBook([book info])', function() {
//   const book = {
//     title: '111', authorLast: '111', authorFirst: '111', genre: '111', price: '111', publisher: '111', isbn: '111', image: '111'
//   }
//   it('should be a function', function(){
//     expect(db.createBook).to.be.a('function')
//   })
//   it('should return an object', function () {
//     const newBook = db.createBook(book)
//     return expect(newBook).to.eventually.be.an('object')
//   })
//   it('should return a non-empty object', function () {
//     const newBook = db.createBook(book)
//     return expect(newBook).to.eventually.not.be.empty
//   })
//   it('should return an object with all keys: id, title, author_first, author_last, genre, publisher, price, image, isbn', function () {
//     const newBook = db.createBook(book)
//     return expect(newBook).to.eventually.have.all.keys('id', 'title', 'author_first', 'author_last', 'genre', 'publisher', 'price', 'image', 'isbn')
//   })
//   it('should return an object with "title" value of "111"', function () {
//     const newBook = db.createBook(book)
//     return expect(newBook).to.eventually.include({ title: '111' })
//   })
// it('should return an error if new book has no title', function () {
//   const newBook = db.createBook({
//     title: '', authorLast: '111', authorFirst: '111', genre: '111', price: '111', publisher: '111', isbn: '111', image: '111'
//   })
//   return expect(newBook).to.eventually.be.equal('new row for relation "books" violates check constraint "books_title_check"')
// })
// })

// describe('db.readAllBooks(limit, offset)', function() {
//   const firstTenBooks = db.readAllBooks(10, 0)
//   it('should be a function', function(){
//     expect(db.readAllBooks).to.be.a('function')
//   })
//   it('should return an array', function () {
//     // const firstTenBooks = db.readAllBooks(10, 0)
//     return expect(firstTenBooks).to.eventually.be.an('array')
//   })
//   it('should return a non-empty array', function () {
//     // const firstTenBooks = db.readAllBooks(10, 0)
//     return expect(firstTenBooks).to.eventually.not.be.empty
//   })
//   it('should include a title of 111', function () {
//     const firstBook = db.readAllBooks(10, 0)
//       .then(function(arr){
//         return arr[0].title
//       })
//     return expect(firstBook).to.eventually.equal('111')
//   })
// })
