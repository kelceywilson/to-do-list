const pgp = require('pg-promise')()

const connection = process.env.DATABASE_URL || 'postgres:///todolist'
const db = pgp(connection)

// Users can create to do list items.
// CREATE one task - return custom error message to view if constraint not met
const createTask = (taskToAdd, tags) => {
  const {task, note, priority, userId} = taskToAdd
  console.log(taskToAdd);
  let {due} = taskToAdd
  if(!due){
    due = new Date()
  }
  const addThisTask = 'INSERT INTO tasks(task, note, priority, due, user_id) VALUES($1, $2, $3, $4, $5) RETURNING id'
  return db.one(addThisTask, [task, note, priority, due, userId])
    .then((newTaskId) => {
      if(!tags){
        return newTaskId
      }
      const addTags = `INSERT INTO tags(task_id, tag)
      SELECT $1 id, x
      FROM unnest(ARRAY[$2:csv]) x RETURNING *`
      return db.any(addTags, [newTaskId.id, tags])
        .then(newTags => newTags)
    })
    .catch(err => console.log(err.message))
}

// READ all tasks
const readAllTasks = () => {
  const getAllTasks = 'SELECT * FROM tasks ORDER BY due ASC'
  return db.any(getAllTasks)
    .then(allTasks => allTasks)
    .catch(err => Object({ success: false, message: err.message }))
}

// READ one task
const readOneTask = (id) => {
  const getThisBook = 'SELECT id, title, author_last, author_first, genre, price, image, publisher, isbn FROM books WHERE id = $1'
  return db.one(getThisBook, [id])
    .then(book => book)
    .catch(err => Object({ success: false, message: err.message }))
}

// READ search all books by author, title, or genre
// const searchBooks = (searchTerms) => {
//   let termz = searchTerms.split(' ')
//   termz = termz.map(term => '%'+term.toLowerCase()+'%')
//   let query = 'SELECT * FROM books WHERE'
//   for (let i = 1; i <= termz.length; i++){
//     if (i > 1) {
//       query += ' OR'
//     }
//     query = `${query} lower(title) LIKE ($${i}) OR lower(author_first) LIKE ($${i}) OR lower(author_last) LIKE ($${i}) OR lower(genre) LIKE ($${i})`
//   }
//   query += ' ORDER BY title ASC'
//   return db.any(query, termz)
//     .then(foundBooks => foundBooks)
//     .catch(err => Object({ success: false, message: err.message }))
// }

// UPDATE one task -- forget about tags
// Users can edit the text on existing to do list items.
// Users can check items off as completed.
const updateTask = (task) => {
  const updateFields = Object.keys(task)
  let query = 'UPDATE tasks SET '
  const fields = []
  updateFields.forEach((field) => {
    if (field !== 'id') fields.push(`${field}=\$/${field}/`)
    // ' first_name=$/first_name/'
  })
  query += fields.join(', ')
  query += ' WHERE id=$/id/ RETURNING *'
  console.log('query', query)
  return db.query(query, task)

  // const updateThisTask = 'UPDATE tasks SET task=$1, note=$2, priority=$3, due=$4 WHERE id=$5 RETURNING *'
  // console.log(task, note, priority, due, id);
  // return db.one(updateThisTask, [task, note, priority, due, id])
  //   .then((updatedTask) => {
  //     console.log(updatedTask);
  //     return updatedTask
  //   })
  //   .catch((err) => {
  //     Object({ success: false, message: err.message })
  //   })
}


// Users can delete unwanted to do list items.
// DELETE one task
const deleteTask = (id) => {
  const deleteThisTask = 'DELETE FROM tasks WHERE id=$1'
  return db.result(deleteThisTask, id)
    .then((deletedTask) => {
      console.log(deletedTask)
      return deletedTask
    })
    .catch(err => console.log(err.message))
    // .catch(err => Object({ success: false, message: err.message }))
}

// register
const register = (firstName, lastName, email, hash) => {
  const addUser = 'INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING first_name'
  return db.one(addUser, [firstName, lastName, email, hash])
    .then((member) => {
      console.log('register', member)
      return member
    })
    .catch(err => Object({ success: false, message: err.message }))
}

// login
const login = (email) => {
  const findUser = 'SELECT first_name, password FROM users WHERE email = $1'
  return db.oneOrNone(findUser, email)
    .then((member) => {
      console.log('login', member)
      return member
    })
    .catch(err => Object({ success: false, message: err.message }))
}

module.exports = {
  createTask,
  readOneTask,
  readAllTasks,
  updateTask,
  deleteTask,
  db,
  login,
  register
}


/**
 * Update the users table with given fields and values
 * @param {object} userUpdates - object with db fields to update and their values
 * @returns {Promise} - Promise which resolves to new values of user

 example input:
    {
        id: 4,
        first_name: 'Kelcey',
        last_name: 'Wilson'
    }

 */
// function updateUser(userUpdates) {
//     updateFields = Object.keys(userUpdates)
//     let query = 'UPDATE users SET '
//     const fields = []
//     updateFields.forEach(field => {
//         if (field !== 'id') fields.push(`${field}=\$/${field}/`)
//         // ' first_name=$/first_name/'
//     })
//     query += fields.join(', ')
//     query += ' WHERE id=$/id/ RETURNING *'
//     console.log('query', query)
//     return db.query(query, userUpdates)
// }
//
// const  data =  {
//     id: 2,
//     first_name: 'Kelcey',
//     last_name: 'Wilson'
// }
//
// updateUser(data)
//     .then(console.log)
//     .catch(console.error)
