// defint UI elements
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let taskList = document.querySelector('#tasks');
let clearBtn = document.querySelector('#clear_task_btn');

// define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);


// define functions

// Add Task
function addTask(e) {
    if (taskInput.value == '') {
        window.alert('Add a Task!');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);

        // add task in local storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';

        // console.log(li);
        // console.log(link);
        // console.log(taskList);
    }

    e.preventDefault();
}

// remove task
function removeTask(e) {
    if(e.target.hasAttribute('href')) {
        if(confirm("Are you sure?")){
            ele = e.target.parentElement;
            ele.remove();
            //console.log(ele);

            removeFromLocalStorage(ele);
        }
        
    }
    
}

// clear task
function clearTask() {
    // taskList.innerHTML = "";

    // Faster way
    while(taskList.firstChild) {
        // taskList.firstChild.remove();
        taskList.removeChild(taskList.firstChild);
    }

    // push a black array in task
    // let tasks = [];
    //localStorage.setItem('tasks', JSON.stringify(tasks));

    // clear the local storage
    localStorage.clear();
}

// filter task
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    // let li = document.querySelectorAll('li');
    let items = document.querySelectorAll('ul#tasks li');


    // console.log(text);
    // console.log(items);

    items.forEach( (item) => {
        
        let task = item.firstChild.textContent.toLowerCase();

        // console.log(items);
        // console.log(task);
        // console.log(text);
        // console.log(task.indexOf(text));

        if (task.indexOf(text) != -1) {
            // console.log(task);
            // console.log(item);
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
            //console.log(task);
        }
    });

    // console.log(li);
}


// add task in local storage
function storeTaskInLocalStorage(task) {
    
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));       
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// load task from local storage during page load
function getTasks() {

    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));       
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);

    });
}


// remove from local storage
function removeFromLocalStorage(taskItem) {

    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));       
    }

    let li = taskItem;
    li.removeChild(li.lastChild); // remove <a>x</a>

    tasks.forEach((task, index) => { // itarate all taks of local storage
        if(li.textContent.trim() === task) { // if the task matches the task that triggered this functio
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); // push updated array to local storage
}