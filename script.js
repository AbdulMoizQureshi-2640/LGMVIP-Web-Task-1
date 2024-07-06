// Select elements
let inputField = document.querySelector(".todo-input");
let addButton = document.querySelector(".add-button");
let todoList = document.querySelector(".todosList");
let homeBgImg = document.querySelector(".homebg");


//let todoItemsArray = JSON.parse(localStorage.getItem("todosList")) || [];

// Initialize todo item array as empty
let todoItemsArray = [];

// Function to extract todos
extractTodos = function () {
    todoList.innerHTML = '';
    if (todoItemsArray.length === 0) {
        homeBgImg.style.display = 'block';
    }
    else {
        homeBgImg.style.display = 'none';
        todoItemsArray.forEach((todoItem, index) => {
            const todoLineItem = document.createElement('li');
            todoLineItem.classList.add('todo');
            todoLineItem.innerHTML = `
                <label>
                    <input type="checkbox" ${todoItem.status === 'completed' ? 'checked' : ''}>
                    <span>${todoItem.name}</span>
                </label>
                <button class="delete-btn" data-index="${index}"><i class="bi bi-x-square-fill"></i></button>
            `;
            // Attach event listener for checkbox
            const checkbox = todoLineItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                updateTodoStatus(checkbox.checked, index);
            });
            // Attach event listener for delete button
            const deleteBtn = todoLineItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                removeTodoItem(index);
            });
            todoList.appendChild(todoLineItem);
        });
    }
    // Save the updated todoItemsArray to localStorage
    // localStorage.setItem("todosList", JSON.stringify(todoItemsArray));
}

// Function to add a new todo item
function addNewTodoItem(todoName) {
    if (todoName.trim() === "") return;
    todoItemsArray.unshift({ name: todoName, status: "pending" });
    extractTodos();
}

// Event listeners
inputField.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        addNewTodoItem(inputField.value);
        inputField.value = "";
    }
});

addButton.addEventListener("click", () => {
    addNewTodoItem(inputField.value);
    inputField.value = "";
});

// Function to update todo status
function updateTodoStatus(checked, index) {
    todoItemsArray[index].status = checked ? "completed" : "pending";
    extractTodos();
}

// Function to remove todo item
function removeTodoItem(index) {
    todoItemsArray.splice(index, 1);
    extractTodos();
}

// Initial todos
extractTodos();
