let elements =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/*-+.!@#$%&*";

const elements_length = elements.length;
const TEXTOUT = document.querySelector("#text-output");
const GENBTN = document.querySelector("#generatebtn");
const COPYBTN = document.querySelector("#copybtn");
let password_length;

let regex = /^(?=.*[0-9])(?=.*\W)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9\W]+){8}$/g;

GENBTN.addEventListener("click", () => {
    let output = "";
    TEXTOUT.textContent = "";
    output = GeneratePassword();
    TEXTOUT.textContent = output;
    TEXTOUT.setAttribute("value", output);
});

const label_range = document.querySelector("#show-number-range");
const range_number = document.querySelector("#number-range");
range_number.addEventListener("input", () => {
    label_range.textContent = parseInt(range_number.value);
    password_length = parseInt(range_number.value);
});

function GeneratePassword() {
    output = "";
    password_length = parseInt(range_number.value);
    for (let i = 0; i < password_length; i++) {
        output += elements.charAt(Math.floor(Math.random() * elements_length));
    }
    if (regex.test(output)) {
        return output;
    } else {
        GeneratePassword();
    }
    return output;
}

COPYBTN.addEventListener("click", () => {
    ///Copy btn, only works with input box and a value inside
    // Select the text field
    TEXTOUT.select();
    TEXTOUT.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field //Copy api
    navigator.clipboard.writeText(TEXTOUT.value);
    setTimeout(() => {
        TEXTOUT.textContent = "";
        TEXTOUT.removeAttribute("value");
    }, 2000);
});
