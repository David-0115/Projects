// JS Todos Exercise
// Part 1
// For this assignment you will be combining your knowledge of DOM access and events to build a todo app!
// As a user, you should be able to:
// 1. Add a new todo (by submitting a form)
// 2. Mark a todo as completed (cross out the text of the todo)
// 3. Remove a todo

// Part 2
// Now that you have a functioning todo app, save your todos in localStorage!
//  Make sure that when the page refreshes, the todos on the page remain there.
document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('#todo-list');
    const savedData = JSON.parse(localStorage.getItem('todoListData'));
    savedData.forEach((item) => {
        createItem(item.value, item.classes);
    });
});

const addToDo = document.querySelector('#add');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');
const help = document.querySelector('#help');
const helpContent = document.querySelector('#help-content');
const close = document.querySelector('#close');
const allLi = document.querySelectorAll('#todo-list li');


addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    createItem(addToDo.value, "item");
});

list.addEventListener('click', function (e) {
    let isComplete = (e.target.classList.contains('complete'));
    let isDelete = (e.target.classList.contains('delete'));
    if (isComplete) {
        e.target.parentElement.classList.toggle('done');
    }
    else if (isDelete) {
        e.target.parentElement.remove();
    }
    save();
});

function save() {
    const currentList = document.querySelector('#todo-list');
    const listItems = document.querySelectorAll('.item');
    const data = [];

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        let length = item.innerText.length;
        const value = item.innerText.slice(0, length - 3);
        const classes = item.className;
        data.push({ value, classes });
    }
    localStorage.setItem('todoListData', JSON.stringify(data));
}

function createItem(value, classes) {
    let newLi = document.createElement("li");
    newLi.innerText = value;
    newLi.className = classes;
    newLi.setAttribute('draggable', 'true');
    let newCheck = document.createElement("button");
    newCheck.innerHTML = "&checkmark;"
    newCheck.className = "complete";
    let newX = document.createElement("button");
    newX.innerText = "X"
    newX.className = "delete";
    list.appendChild(newLi);
    let li = list.lastChild;
    li.append(newCheck);
    li.append(newX);
    addToDo.value = "";
    save()
}

// function load() {

// }
help.addEventListener('click', function () {
    list.style.display = "none";
    helpContent.style.display = "block";
});

close.addEventListener('click', function () {
    list.style.display = "block";
    helpContent.style.display = "none";
});

function dragStart(e) {
    this.style.opacity = '0.4';
}

function dragEnd(e) {
    this.style.opacity = '1';
}

let liItems = document.querySelectorAll('#todo-list .item')
liItems.forEach(function (item) {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
})
