//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")
const check = document.querySelector(".todo")

//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//functions

const createDiv = (todolist) => { 
    //Todo DIV
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todolist
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //check mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    
    //check trash
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //append to list
    todoList.appendChild(todoDiv)
}

function addTodo(event){
    
    //prevent form from submiiting
    event.preventDefault()
    
    //Add todo to localStorage
    saveLocalTodos(todoInput.value)

    //create todo list
    let todolist = todoInput.value
    createDiv(todolist)

    //clear input text
    todoInput.value = ""
}

function deleteCheck(e){
    const item = e.target

    //delete
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }
    
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
                todo.style.display = "flex"
                break
            case "completed": 
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = "none"
                }
                break
            case "uncompleted": 
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = "none"
                }
        }
    })
}

const checkStorage = () => {
    //check if there's already a file in local storage
    let todos
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}
const saveLocalTodos = (todo) => {
    todos = checkStorage()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

/*const saveCompletedTodos = (todo) => {
    let completed
    if(localStorage.getItem('completed') === null){
        completed = [];
    }else{
        todos = JSON.parse(localStorage.getItem('completed'))
    }
    completed.push(todo)
    localStorage.setItem('completed', JSON.stringify(completed))
}*/

function getTodos(){
    todos = checkStorage()
    todos.forEach(function(todo){
        createDiv(todo)
    })
}

const removeLocalTodos = (todo) => {
    todos = checkStorage()
    const del = todo.innerText
    todos.splice(todos.indexOf(del), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}