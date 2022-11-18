const morse_dictionary = [
    ["a", ".-"],
    ["b", "-..."],
    ["c", "-.-."],
    ["d", "-.."],
    ["e", "."],
    ["f", "..-."],
    ["g", "--."],
    ["h", "...."],
    ["i", ".."],
    ["j", ".---"],
    ["k", "-.-"],
    ["l", ".-.."],
    ["m", "--"],
    ["n", "-."],
    ["o", "---"],
    ["p", ".--."],
    ["q", "--.-"],
    ["r", ".-."],
    ["s", "..."],
    ["t", "-"],
    ["u", "..-"],
    ["v", "...-"],
    ["w", ".--"],
    ["x", "-..-"],
    ["y", "-.--"],
    ["z", "--.."],
];

////TextToMorse
const user_text = document.querySelector("#text-to-morse");
const text_result = document.querySelector("#text-output");
const btn_text = document.querySelector("#text-to-morsebtn");

////MorseToText
const user_morse = document.querySelector("#morse-to-text");
const morse_result = document.querySelector("#morse-output");
const morse_btn = document.querySelector("#morse-to-textbtn");

btn_text.addEventListener("click", () => {
    text_result.textContent = "";
    let text = user_text.value.toLowerCase();
    let morse_output = TextToMorse(text);
    text_result.textContent = morse_output;
});

function TextToMorse(word) {
    let user_word = word.replace(/\s/g, "");
    let word_array = user_word.split("");
    let text_to_morse = "";
    word_array.forEach((letter) => {
        morse_dictionary.forEach((morsecode) => {
            if (letter.includes(morsecode[0])) {
                text_to_morse += morsecode[1] + " / ";
            }
        });
    });
    return text_to_morse;
}

///MORSE2TXT FUNCTIONS

morse_btn.addEventListener("click", () => {
    morse_result.textContent = "";
    let morse = user_morse.value;
    let morse_output = MorseToText(morse);
    morse_result.textContent = morse_output;
});

function MorseToText(morse) {
    let morse_code = morse.replace(/\s/g, "");
    let morse_to_text = "";
    let morse_array = morse_code.split("/");
    morse_array.forEach((code) => {
        morse_dictionary.forEach((morseletter) => {
            if (code === morseletter[1]) {
                morse_to_text += morseletter[0] + " ";
            }
        });
    });
    return morse_to_text;
}
