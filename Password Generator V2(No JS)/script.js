const generatebtn = document.querySelector("#generateBTN");
const UpperCheckbox = document.querySelector("#checkbox");
const LowerCheckbox = document.querySelector("#checkbox2");
const NumCheckbox = document.querySelector("#checkbox3");
const SymCheckbox = document.querySelector("#checkbox4");
const PasswordLength = document.querySelector("#pass-length");
const DisplayRangeValue = document.querySelector("#displayRangeValue");
const DisplayPassword = document.querySelector("#displayPassword");

const CheckboxDiv = document.querySelector(".checkboxes");

const regex = /^(?=.*[0-9])(?=.*\W)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9\W]+){8}$/g;

const UpperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXY";
const LowerLetters = "abcdefghijklmnopqrstuvwxyz";
const Numbers = "0123456789";
const Symbols = "!@#$%^&*()";

console.log();

PasswordLength.addEventListener("input", () => {
    DisplayRangeValue.textContent = PasswordLength.value;
});

generatebtn.addEventListener("click", () => {
    const PassLength = PasswordLength.value;
    const checked1 = UpperCheckbox.checked;
    const checked2 = LowerCheckbox.checked;
    const checked3 = NumCheckbox.checked;
    const checked4 = SymCheckbox.checked;

    let randomChars = "";
    if (checked1) randomChars += UpperLetters;
    if (checked2) randomChars += LowerLetters;
    if (checked3) randomChars += Numbers;
    if (checked4) randomChars += Symbols;

    console.log(PasswordLength.value);
    let PasswordOutput = generatePassword(randomChars, PassLength);
    DisplayPassword.textContent = PasswordOutput;
    console.log({ PasswordOutput });
});

function generatePassword(str, num) {
    console.log({ str, num });
    let Generated = "";

    for (let i = 0; i < num; i++) {
        let randomNum = Math.floor(Math.random() * str.length);
        Generated += str[randomNum];
    }
    return Generated;
}

const checkbox = document.querySelectorAll(".checkbox");

checkbox.forEach((el) => {
    el.addEventListener("click", () => {
        if (el.childNodes[1].checked) {
            el.childNodes[1].checked = false;
        } else {
            el.childNodes[1].checked = true;
        }
    });
});

console.log(checkbox);
