console.log('Sanity Check: JS is working!')

const newTask = '<input class="new-task" name="newTask" onkeypress="createTask(event)" placeholder="new task" />'

const createTask = (event) => {
  if (event.code === 'Enter') {
    const taskText = document.getElementsByClassName('new-task')[0].value
    if (taskText === '') {
      return alert('Task must be at least one character long')
    }
    const body = {
      taskToAdd: {
        task: taskText,
        note: 'task note',
        priority: 4,
        userId: 1
      },
      tags: ['job', 'life']
    }
    fetch('/createTask', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((message) => {
        if(message.redirected){
          location.reload()
        }
      })
  }
}

const updateTask = (id) => {
  console.log('task id', id);
  const taskText = document.getElementById(id).value
  console.log(taskText);
  const body = {
    taskToUpdate: {
      id: id,
      task: taskText,
      completed: completed
    }
  }
  fetch('/updateTask', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((message) => {
      if(message.redirected){
        console.log(message);
      }
    })
}

const deleteTask = (id) => {
  console.log(id);
  fetch('/deleteTask/' + id, {
    method: 'delete'
  })
    .then((message) => {
      if(message.redirected){
        location.reload()
      }
    })
}

const cancelUpdate = () => {
  location.reload()
}

// Enable adding new task by appending input element to DOM
$('.add-task').click(function(){
  $('#add-task').hide()
  $('.tasks').append(newTask)
})


const checkboxes = document.querySelectorAll('.checkbox')

$(checkboxes).change(function(event){
  const body = {
    taskToUpdate: {
      id: $(event.target).data().id,
      completed: event.target.checked
    }
  }
  fetch('/updateTask', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((message) => {
      if(message.redirected){
        console.log(message);
      }
    })
})
