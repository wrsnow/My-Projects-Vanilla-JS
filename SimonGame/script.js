let boxesOrder = [];
let userOrder = [];
let pressedTimes = 0;

let baseGlowOutValue = 300;

$(() => {
    $("#startBTN").on("click", () => {
        startGame();
    });
    $(".square").on("click", function (e) {
        let index = $(".square").index(this);
        userOrder.push(index);
        pressedTimes += 1;
        let isCorrect = checkMatch(userOrder);
        if (!isCorrect) {
            wrongChoice(index);
            return;
        }
        if (pressedTimes === boxesOrder.length) {
            pressedTimes = 0;
            console.log(userOrder);
            generateNextBox();
        }
        glowChosenBox(index, true);
    });
});

function glowInOrder(i = 0, arr) {
    let arrLength = arr.length;
    disableBoxes();

    if (i <= arrLength) {
        setTimeout(() => {
            $(".square").eq(arr[i]).addClass("active");
            playAudio(arr[i]);
        }, 50);
        setTimeout(() => {
            $(".square").eq(arr[i]).removeClass("active");
            i++;
            glowInOrder(i, arr);
        }, baseGlowOutValue + 300);
    } else {
        enableBoxes();
    }
}

function glowChosenBox(index) {
    setTimeout(() => {
        disableBoxes();
        $(".square").eq(index).addClass("active");
        playAudio(index);
    }, 50);
    setTimeout(() => {
        enableBoxes();
        $(".square").eq(index).removeClass("active");
    }, baseGlowOutValue);
}

function checkMatch(userChoices) {
    console.log(userChoices);
    let arrIndex = userChoices.length - 1;
    return boxesOrder[arrIndex] === userChoices[arrIndex];
}

function disableBoxes() {
    $(".container").addClass("active");
}
function enableBoxes() {
    $(".container").removeClass("active");
}

function startGame() {
    boxesOrder = [];
    for (let i = 0; i < 3; i++) {
        boxesOrder.push(randomNumber());
    }
    glowInOrder(0, boxesOrder);
    enableBoxes();
}

function getNextChallenge() {
    glowInOrder(0, boxesOrder);
    enableBoxes();
}

function wrongChoice(index) {
    userOrder = [];
    pressedTimes = 0;
    setTimeout(() => {
        disableBoxes();
        $(".square").eq(index).addClass("active");
        playAudio("wrong");
    }, 50);
    setTimeout(() => {
        $(".square").eq(index).removeClass("active");
        alert("Game over!");
    }, baseGlowOutValue);
}

function playAudio(index) {
    let audio = new Audio(`./sounds/${index}.mp3`);
    audio.play();
}

function generateNextBox() {
    userOrder = [];
    pressedTimes = 0;
    boxesOrder.push(randomNumber());
    setTimeout(() => getNextChallenge(), 1200);
}

function randomNumber() {
    return Math.floor(Math.random() * 4);
}

disableBoxes();
