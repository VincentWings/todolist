//* Selectors
const todoForm = document.querySelector('.todo-list__form');
const todoInput = document.querySelector('.todo-list__form__input');
const todoButton = document.querySelector('.todo-list__form__button');
const todoList = document.querySelector('.todo-list__list');
const filterOption = document.querySelector('.todo-filter .filter')

//* Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addLine);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('change', filterTodo);

//* Functions
function addLine(event) {
    //* Prevent form from submitting
    event.preventDefault();

    //* Create Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-list__list-div');

    //* Create LI
    const todoLine = document.createElement('li');
    todoLine.classList.add('todo-list__list-item');
    todoLine.innerText = todoInput.value;
    todoDiv.appendChild(todoLine);

    //* Add todo to local storage
    saveLocalTodos(todoInput.value);

    //* Create the check mark button
    const completedButton = document.createElement('button');
    completedButton.classList.add('button', 'button-completed');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //* Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'button-delete');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(deleteButton);

    //* Add the todoDiv to the UL
    if (todoInput.value != '') {
        todoList.appendChild(todoDiv);
    }

    //* Clear Todo Input value
    todoInput.value = '';
}

function deleteAndCheck(e) {
    const item = e.target;

    //* Delete todo
    if (item.classList[1] === 'button-delete') {
        const todo = item.parentElement;

        //* Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //* Check mark todo
    if (item.classList[1] === 'button-completed') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        //* if click on 'all', e is the <option> and value is 'all'
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "done":
                //* Check if all the todos have the class completed
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "todo":
                //* Check if all the todos have the class completed
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //* CHECK if there is already things in there
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //* The things in the function parameter get push in the variable todos
    todos.push(todo);

    //* Send it to the local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //* CHECK if there is already things in there
    let todos;

    if (localStorage.getItem('todos') === null) {
        //* Create an empty array
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        //* Create Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-list__list-div');

        //* Create LI
        const todoLine = document.createElement('li');
        todoLine.classList.add('todo-list__list-item');
        todoLine.innerText = todo;
        todoDiv.appendChild(todoLine);

        //* Create the check mark button
        const completedButton = document.createElement('button');
        completedButton.classList.add('button', 'button-completed');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        //* Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('button', 'button-delete');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        todoDiv.appendChild(deleteButton);

        //* Add the todoDiv to the UL
        todoList.appendChild(todoDiv);
    });
}


// todo is the DIV
function removeLocalTodos(todo) {
    //* CHECK if there is already things in there
    let todos;

    if (localStorage.getItem('todos') === null) {
        //* Create an empty array
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //* Navigate to the text
    const todoIndex = todo.children[0].innerText;

    //* Access to the index of the array with indexOf
    //* With splice remove the index of where there is the text
    //* We specify how many we want to remove: 1, 2, 3 etc... Here 1
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//? EXPLANATIONS ON WHAT THE CODE DOES:

//? const todos = ['apple', 'lemon', 'banana'];
//? const indexOfLemon = todos.indexOf('lemon');
//? console.log(indexOfLemon); // Give the number 1

//? todos.splice(indexOfLemon, 1);
//? console.log(todos); // indexOfLemon is now removed from the array