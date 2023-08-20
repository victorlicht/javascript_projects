const input = document.querySelector('#input');
const listContainer = document.querySelector('#list-container');

function addTask() {
    if (input.value === '') {
        alert("You must write something");
    } else {
        const li = document.createElement("li");
        li.innerHTML = input.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);    
    }
    input.value = "";
    saveData();
}


listContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    }else if (event.target.tagName == "SPAN") {
        event.target.parentElement.remove();
        saveData();
    }
}, false);

const saveData = () => localStorage.setItem("data", listContainer.innerHTML);
const showTask = () => listContainer.innerHTML = localStorage.getItem("data");
showTask();

