let boxesOrder = [];
let userOrder = [];
let pressedTimes = 0;
let score = 0;
let timeOut;

let baseFadeInOut_Value = 200;
disableBoxes();

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
            console.log("Final click");
            pressedTimes = 0;
            score += 1;
            $("h4").text(`Score: ${score}`);
            glowChosenBox(index);
            timeOut = setTimeout(() => {
                generateNextBox();
                disableBoxes();
            }, baseFadeInOut_Value);
        } else {
            glowChosenBox(index);
        }
    });
});

function glowInOrder(i = 0, arr) {
    let arrLength = arr.length;
    disableBoxes();
    if (i < arrLength) {
        timeOut = setTimeout(() => {
            $(".square")
                .eq(arr[i])
                .fadeIn(baseFadeInOut_Value)
                .fadeOut(baseFadeInOut_Value)
                .fadeIn(baseFadeInOut_Value);
            playAudio(arr[i]);
            i++;
            glowInOrder(i, arr);
        }, baseFadeInOut_Value * 2);
    } else {
        timeOut = setTimeout(() => {
            enableBoxes();
            return;
        }, baseFadeInOut_Value * 1.5);
    }
}

function glowChosenBox(index) {
    disableBoxes();
    playAudio(index);
    $(".square")
        .eq(index)
        .fadeIn(baseFadeInOut_Value)
        .fadeOut(baseFadeInOut_Value)
        .fadeIn(baseFadeInOut_Value);
    timeOut = setTimeout(() => {
        enableBoxes();
        return;
    }, baseFadeInOut_Value);
}

function checkMatch(userChoices) {
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
    clearTimeout(timeOut);
    clearPreviousData();
    for (let i = 0; i < 3; i++) {
        boxesOrder.push(randomNumber());
    }
    glowInOrder(0, boxesOrder);
}

function getNextChallenge() {
    glowInOrder(0, boxesOrder);
    enableBoxes();
}

function wrongChoice(index) {
    clearPreviousData();
    timeOut = setTimeout(() => {
        disableBoxes();
        $(".square")
            .eq(index)
            .fadeIn(baseFadeInOut_Value)
            .fadeOut(baseFadeInOut_Value)
            .fadeIn(baseFadeInOut_Value);
        playAudio("wrong");
    }, 50);
    timeOut = setTimeout(() => alert("Game over!"), baseFadeInOut_Value + 100);
}

function playAudio(index) {
    let audio = new Audio(`./sounds/${index}.mp3`);
    audio.volume = 0.125;
    audio.play();
}

function generateNextBox() {
    userOrder = [];
    pressedTimes = 0;
    boxesOrder.push(randomNumber());
    timeOut = setTimeout(() => getNextChallenge(), 800);
}

function randomNumber() {
    return Math.floor(Math.random() * 4);
}
function clearPreviousData() {
    userOrder = [];
    boxesOrder = [];
    pressedTimes = 0;
    $("h4").text(`Score: 0`);
    score = 0;
}

disableBoxes();
