const images = [
    {
        name: "bear",
        img: "./assets/bear-face-svgrepo-com.svg",
    },
    {
        name: "cat",
        img: "./assets/cat-face-svgrepo-com.svg",
    },
    {
        name: "giraffe",
        img: "./assets/giraffe-svgrepo-com.svg",
    },
    {
        name: "bear",
        img: "./assets/bear-face-svgrepo-com.svg",
    },
    {
        name: "cat",
        img: "./assets/cat-face-svgrepo-com.svg",
    },
    {
        name: "giraffe",
        img: "./assets/giraffe-svgrepo-com.svg",
    },
];

const blank_card = {
    name: "blank",
    img: "data:image/png;base64,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",
};
let score = 0;

images.sort(() => 0.5 - Math.random());
console.log(images);

const startbtn = document.querySelector("#startBTN");
const display_cards = document.querySelector(".item-container");
let TwoCards = [];

startbtn.addEventListener("click", () => {
    display_cards.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
        let cards = document.createElement("img");
        cards.setAttribute("src", "./assets/question-mark.svg");
        cards.setAttribute("data-id", i);
        cards.addEventListener("click", Flipcard);
        display_cards.appendChild(cards);
    }
});

function Flipcard() {
    let data_id = this.getAttribute("data-id");
    this.setAttribute("src", images[data_id].img);
    console.log(data_id);
    !TwoCards.includes(data_id) ? TwoCards.push(data_id) : null;
    if (TwoCards.length >= 2) {
        checkMatch(TwoCards);
        TwoCards = [];
    }
    console.log(TwoCards);
}

function checkMatch(arr) {
    const cards = document.querySelectorAll("img");
    let card1_index = arr[0];
    let card2_index = arr[1];
    let card1_name = images[card1_index].name;
    let card2_name = images[card2_index].name;
    if (card1_name === card2_name) {
        console.log("It's a match!");
        setTimeout(() => {
            cards[card1_index].setAttribute("style", "visibility: hidden;");
            cards[card2_index].setAttribute("style", "visibility: hidden;");
        }, 450);
        score++;
    } else {
        console.log("its not a match");
        setTimeout(() => {
            cards[card1_index].setAttribute(
                "src",
                "./assets/question-mark.svg"
            );
            cards[card2_index].setAttribute(
                "src",
                "./assets/question-mark.svg"
            );
        }, 450);
    }
    console.log(score);
}
