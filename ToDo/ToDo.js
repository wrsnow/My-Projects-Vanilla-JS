const ul = document.querySelector(".ul-body");
const input_box = document.querySelector("#inputbox");
//BUTTONS
const add_btn = document.querySelector("#addbutton");
const delete_button = document.querySelector("#delete-button");
const check_button = document.querySelector("#check-button");
///
const li_div = document.querySelector(".li-item");
let li_array = [];
let temp_array = [];

let ul_items = "";

///ADD BUTTON AND INPUT LISTENER
add_btn.addEventListener("click", () => {
    !li_array.includes(input_box.value) ? li_array.push(input_box.value) : null;
    localStorage.setItem("li_array", JSON.stringify(li_array));
    GenerateToDo();
    console.log(li_array);
    input_box.value = "";
});

///ADD WITH ENTER KEY
input_box.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        !li_array.includes(input_box.value)
            ? li_array.push(input_box.value)
            : null;
        localStorage.setItem("li_array", JSON.stringify(li_array));
        GenerateToDo();
        console.log(li_array);
        input_box.value = "";
    }
});

///OUTPUTS THE USER'S TO DO's
function GenerateToDo() {
    let list = "";
    for (let div of li_array) {
        list += `<div class="li-item">
			<li id="${div}">${div}</li>
			<button id="delete-button" onclick="DeleteParent(this)" data-id="${li_array.indexOf(
                div
            )}"><i class="fa-solid fa-trash"></i></button>
			<button id="check-button"><i onclick="CheckItem(${div})" class="fa-solid fa-check"></i></button>
		</div>`;
    }
    ul.innerHTML = list;
}
GenerateToDo();

///////////////////////////
//DELETE FROM LOCAL_STORAGE,ARRAY AND LIST
function DeleteParent(button) {
    let index = button.getAttribute("data-id");
    button.parentElement.remove();
    li_array.splice(index, 1);
    localStorage.setItem("li_array", JSON.stringify(li_array));
    GenerateToDo();
}

///MARK FINISHED TASK
function CheckItem(div) {
    div.setAttribute("style", "text-decoration: line-through;");
}

///////////////////////////
//GET TO DO's FROM LOCAL_STORAGE
function LoadFromLocalStorage() {
    let fromLocalStorage = JSON.parse(localStorage.getItem("li_array"));
    if (fromLocalStorage) {
        li_array = fromLocalStorage;
        GenerateToDo();
    }
}

LoadFromLocalStorage();
