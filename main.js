import store from "./store/store";
import { addItem, deleteItem, toggleComplete, editItem } from "./store/actions";

const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector(".todo-list__input input");
const todoLists = document.querySelector('.todo-list__body');
const todoSearch = document.querySelector('#todo-search');

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todo = todoInput.value;
    store.dispatch(addItem({
        id: Date.now(),
        value: todo,
        completed: false
    }));
    todoInput.value = "";
});

todoLists.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo-list__item__delete-btn")) {
        store.dispatch(deleteItem(event.target.closest(".todo-list__item").id));
    }
});

todoLists.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        store.dispatch(toggleComplete(event.target.closest(".todo-list__item").id));
    }
});

todoLists.addEventListener("dblclick", (event) => {
    if (event.target.parentElement.classList.contains("todo-list__item__text") || event.target.classList.contains("todo-list__item__text")) {
        const todo = event.target.closest(".todo-list__item");
        const todoText = todo.querySelector(".todo-list__item__text p");
        todoText.setAttribute("contenteditable", "true");
        todoText.focus();
        todoText.addEventListener("focusout", () => {
            todoText.setAttribute("contenteditable", "false");
            store.dispatch(editItem(todo.id, todoText.innerText));
        });
    }
});

todoSearch.addEventListener("input", (event) => {
    const todos = store.getState();
    const filteredTodos = todos.filter((todo) => todo.value.toLowerCase().includes(event.target.value.toLowerCase()));
    showLists(filteredTodos);
});


store.subscribe(() => {
    const todos = store.getState();
    showLists(todos);
});

const showLists = (todos) => {
    todoLists.innerHTML = "";
    todos.forEach((todo, index) => {
        let template = `
        <div class="todo-list__item" id="${todo.id}" key="${index}">
            <div class="todo-list__item__checkbox">
                <input type="checkbox" name="checkbox-${todo.id}" ${todo.completed && 'checked'}/>
            </div>
            <div class="todo-list__item__text ${todo.completed ? 'todo-completed' : ''}">
                <p>${todo.value}</p>
            </div>
            <div class="todo-list__item__delete">
                <button class="todo-list__item__delete-btn">Delete</button>
            </div>
        </div>
        `;
        todoLists.insertAdjacentHTML('beforeend', template);
    });
}