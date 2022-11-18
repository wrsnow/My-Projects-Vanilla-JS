const search_bar = document.querySelector("#searchbar");

const text_box = document.querySelector("#text-input");
const button = document.querySelector("#button");
const ul_container = document.querySelector(".ul-container");
const date_text = document.querySelector("#date-id");
let user_items = [];

button.addEventListener("click", (e) => {
    e.preventDefault();
    let date = FormattedDate(date_text.value + "T00:00:00");
    if (text_box.value) {
        user_items.push({ text: text_box.value, date: date });
        renderItems();
    }
});

function renderItems() {
    let list = "";
    for (let item of user_items) {
        list += `<div class="ul-items">
		<li id="li-item">${item.text}</li>
		<span id="date-output">${item.date}</span>
		<button id="delete-button">X</button>
</div>`;
    }
    ul_container.innerHTML = list;
}

function FormattedDate(date) {
    let temp_date = new Date(date);
    day = temp_date.getDate();
    month = temp_date.getMonth() + 1;
    year = temp_date.getFullYear();
    //
    day = day <= 9 ? "0" + day : day;
    month = month <= 9 ? "0" + month : month;
    fulldate = `${month}/${day}/${year}`;
    return fulldate;
}

search_bar.addEventListener("input", (e) => {
    //SEARCH FOR ITEMS
    renderItems();
    let value = e.target.value;
    let ul_item = document.querySelectorAll(".ul-items");
    ul_item.forEach((ul) => {
        if (ul.innerHTML.toLowerCase().includes(value)) {
            ul.setAttribute("style", "display: flex");
        } else {
            ul.setAttribute("style", "display: none");
        }
    });
});
renderItems();
