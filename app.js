// Get references to the input field, add button, and the to-do list container
let button = document.getElementById('add');
let todolist = document.getElementById('todoList');
let input = document.getElementById('input');

// Create an array to hold to-do items
let todos = [];

// Load to-dos from localStorage when the page loads
window.onload = () => {
    const storedTodos = localStorage.getItem('todos'); // Get saved todos from localStorage
    todos = storedTodos ? JSON.parse(storedTodos) : []; // If found, parse JSON, else empty array
    todos.forEach(todo => addtodo(todo)); // Add each todo to the DOM
};

// Event listener for the "Add" button
button.addEventListener('click', () => {
    if (input.value.trim() !== '') { // Only add if the input is not empty
        todos.push(input.value); // Add to array
        updateLocalStorage(); // Save updated array to localStorage
        addtodo(input.value); // Add new todo to DOM
        input.value = ''; // Clear input field
    }
});

// Function to create and display a todo item in the DOM
function addtodo(todo) {
    // Create main container for each todo item
    let container = document.createElement('div');
    container.classList.add('todo-item');

    // Create a sub-container to hold the todo text
    let cont = document.createElement('div');
    cont.classList.add('todo-text');

    // Create the paragraph that shows the todo text
    let para = document.createElement('p');
    para.innerText = todo;

    // Create a container for the buttons (complete, delete)
    let tbtns = document.createElement('div');
    tbtns.classList.add('todo-btns');

    // Create the "Complete" button
    let completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.classList.add('complete-btn');

    // On click, strike-through the text (mark as completed)
    completeBtn.addEventListener('click', () => {
        para.style.textDecoration = 'line-through';
    });

    // On double-click, remove the strike-through (mark as not completed)
    completeBtn.addEventListener('dblclick', () => {
        para.style.textDecoration = 'none';
    });

    // Create the "Remove" button
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    removeBtn.classList.add('remove-btn');

    // On click, remove the todo from DOM and from the list
    removeBtn.addEventListener('click', () => {
        todolist.removeChild(container); // Remove item from page
        removeTodo(todo); // Remove item from array and update localStorage
    });

    // Assemble the DOM structure
    container.appendChild(cont);        // Add text container to main container
    cont.appendChild(para);            // Add paragraph to text container
    container.appendChild(tbtns);      // Add buttons container to main container
    tbtns.appendChild(completeBtn);    // Add complete button to buttons container
    tbtns.appendChild(removeBtn);      // Add remove button to buttons container
    todolist.appendChild(container);   // Add the full todo container to the list
}

// Function to remove a todo from the array and update localStorage
function removeTodo(todo) {
    todos = todos.filter(t => t !== todo); // Remove the specific todo from the array
    updateLocalStorage(); // Save updated list
}

// Function to update the localStorage with the current todo list
function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert array to JSON and store
}
