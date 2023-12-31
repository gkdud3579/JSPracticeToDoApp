const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

window.onload = function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `Date: ${year} - ${month} - ${day}`;
    const todayDateElement = document.querySelector('.date');
    todayDateElement.textContent = today;
    loadTodoList();
}

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        compelete: false
    }

    todos.unshift(item);
    const { itemEl, inputEl } = createTodoElement(item);
    list.prepend(itemEl);
    inputEl.removeAttribute("disabled");
    inputEl.focus();
}

function createTodoElement(item) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if(item.compelete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement ("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    removeBtnEl.innerText = "remove_circle";

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.appendChild(checkbox);
    itemEl.appendChild(inputEl);
    itemEl.appendChild(actionsEl);

    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;
    
        if(item.complete) {
            itemEl.classList.add("complete");
        }
        else {
            itemEl.classList.remove("complete");
        }
    });
    
    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    });
    
    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
    });
    
    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });
    
    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);
    
        itemEl.remove();
    });

    return { itemEl, inputEl, editBtnEl, removeBtnEl };

}

