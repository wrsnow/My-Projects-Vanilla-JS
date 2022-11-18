//dateformat = new Date("2021-02-27T00:00:00");
const email = document.querySelector("#email-input");
let email_id, username_id, password_id, password_id2;
const username = document.querySelector("#username-input");

///PASSWORD SECTION
const password = document.querySelector("#password-input");
const password_confirm = document.querySelector("#password-input2");
const status_password = document.querySelector(".status-password");
const status_password_confirm = document.querySelector(
    ".status_password_confirm"
);
const confirm_btn = document.querySelector("#confirmBTN");
const closemodal_btn = document.querySelector("#closemodalBTN");
const modal = document.querySelector(".modal");

let value_key1 = "";
let value_key2 = "";

///GET PASSWORD INPUT
password.addEventListener("input", () => {
    let password_input = password.value;
    CheckCharacters(password_input);
});

///GET PASSWORD CONFIRM INPUT
password_confirm.addEventListener("input", () => {
    let password_input2 = password_confirm.value;
    ConfirmPassword(password_input2);
});

///GET PASSWORD INPUT CHARACTERS
function CheckCharacters(phrase) {
    let array_regex = [/.*[a-z]/g, /.*[A-Z]/g, /.*[0-9]/g, /.*\W/g];
    array_regex[0].test(phrase)
        ? createList(0, 0, "greenyellow")
        : createList(0, 0, "#ff8e8e");
    array_regex[1].test(phrase)
        ? createList(1, 0, "greenyellow")
        : createList(1, 0, "#ff8e8e");
    array_regex[2].test(phrase)
        ? createList(2, 0, "greenyellow")
        : createList(2, 0, "#ff8e8e");
    array_regex[3].test(phrase)
        ? createList(3, 0, "greenyellow")
        : createList(3, 0, "#ff8e8e");
    phrase.length >= 8
        ? createList(4, 0, "greenyellow")
        : createList(4, 0, "#ff8e8e");
    return (value_key1 = phrase);
}

///GET PASSWORD CONFIRM INPUT CHARACTERS
function ConfirmPassword(phrase2) {
    let array_regex = [/.*[a-z]/g, /.*[A-Z]/g, /.*[0-9]/g, /.*\W/g];
    array_regex[0].test(phrase2)
        ? createList(0, 1, "greenyellow")
        : createList(0, 1, "#ff8e8e");
    array_regex[1].test(phrase2)
        ? createList(1, 1, "greenyellow")
        : createList(1, 1, "#ff8e8e");
    array_regex[2].test(phrase2)
        ? createList(2, 1, "greenyellow")
        : createList(2, 1, "#ff8e8e");
    array_regex[3].test(phrase2)
        ? createList(3, 1, "greenyellow")
        : createList(3, 1, "#ff8e8e");
    phrase2.length >= 8
        ? createList(4, 1, "greenyellow")
        : createList(4, 1, "#ff8e8e");
    if (phrase2 === value_key1) {
        createList(5, 1, "#ff8e8e", "none");
    } else {
        createList(5, 1, "#ff8e8e", "list-item");
    }
    return (value_key2 = phrase2);
}

///GET RESPONSE OF PASSWORD INPUTS
function createList(number, list_number, color, display = "list-item") {
    if (list_number == 0) {
        status_password.children[number].setAttribute(
            "style",
            `display: ${display}; color: ${color};`
        );
    }
    if (list_number == 1) {
        status_password_confirm.children[number].setAttribute(
            "style",
            `display: ${display}; color: ${color};`
        );
    }
}

/* display_message.forEach((span) => {
    if (span.id === "email") {
        id = span.getAttribute("id");
        email_id = document.getElementById(id);
    }
    if (span.id === "username") {
        id = span.getAttribute("id");
        username_id = document.getElementById(id);
    }
    if (span.id === "password") {
        id = span.getAttribute("id");
        password_id = document.getElementById(id);
    }
    if (span.id === "password2") {
        id = span.getAttribute("id");
        password_id2 = document.getElementById(id);
    }
});
 */

confirm_btn.addEventListener("click", () => {
    if (!modal.classList.contains("show-modal")) {
        modal.classList.add("show-modal");
    }
});

closemodal_btn.addEventListener("click", () => {
    if (modal.classList.contains("show-modal")) {
        modal.classList.remove("show-modal");
    }
});
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let unique_set = [...new Set(array)];

let unique = array.filter((x, index) => {
    return array.indexOf(x) === index;
});

console.log(unique_set);
