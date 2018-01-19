const express = require('express')

const router = express.Router()

const {
  createTask,
  readAllTasks,
  readOneTask,
  updateTask,
  deleteTask
} = require('../db/db.js')


// CREATE new task
router.post('/createTask', (req, res) => {
  console.log('/createTask', req.body);
  createTask(req.body.taskToAdd, req.body.tags)
    .then((newTags) => {
      console.log(newTags)
      res.redirect('/')
    })
})

// READ all tasks
router.get('/', (req, res) => {
  readAllTasks()
    .then((allTasks) => {
      // console.log(allTasks);
      res.render('tasks', { tasks: allTasks })
    })
})

// READ one task
router.get('/readOneTask', (req, res) => {
  readOneTask(req.body.id)
    .then((allTasks) => {
      res.render('task', allTasks)
    })
})

// UPDATE one task
router.post('/updateTask', (req, res) => {
  // const { task, note, priority, id } = req.body.taskToUpdate
  // const due = new Date()
  console.log('/updateTask', req.body.taskToUpdate);
  updateTask(req.body.taskToUpdate)
    .then((updated) => {
      console.log('updated?', updated)
      res.redirect('/')
    })
})

// router.delete('/deleteTask', (req, res) => {
//   console.log(req.body);
//   deleteTask(req.body)
//     .then((deleted) => {
//       console.log(deleted)
//       res.redirect('/')
//     })
// })
router.delete('/deleteTask/:id', (req, res) => {
  console.log(req.body);
  deleteTask(req.params.id)
    .then((result) => {
      console.log('delete', result);
      res.redirect('/')
    })
})

module.exports = router
