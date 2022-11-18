////////////////////////////////////////////////////////////////////////////////////////////////////////////
///STOPWATCH
let ms = 0;
let minutes = 0;
let seconds = 0;
let hours = 0;

const seconds_display = document.querySelector("#seconds");
const minutes_display = document.querySelector("#minutes");
const hours_display = document.querySelector("#hours");
const ms_display = document.querySelector("#ms");
let max_number = 100;
let myClock_ms;
const start_btn = document.querySelector("#startBTN");
const pause_btn = document.querySelector("#pauseBTN");
const clear_btn = document.querySelector("#clear-btn");

const show_time = document.querySelector("#show-time");

start_btn.addEventListener("click", StartTimer);
pause_btn.addEventListener("click", pauseTimer);
clear_btn.addEventListener("click", clearTimer);

function StartTimer() {
    clearInterval(myClock_ms);
    myClock_ms = setInterval(countUp, 100);
}

function countUp() {
    ms += 1;
    ms_display.textContent = ms <= 9 ? "0" + ms : ms;
    if (ms >= max_number) {
        ms = 0;
        seconds++;
        seconds = seconds <= 9 ? "0" + seconds : seconds;
        seconds_display.textContent = seconds;
    }
    if (seconds >= 60) {
        minutes++;
        minutes = minutes <= 9 ? "0" + minutes : minutes;
        minutes_display.textContent = minutes;
        seconds = 0;
    }
    if (minutes >= 60) {
        hours++;
        hours = hours <= 9 ? "0" + hours : hours;
        hours_display.textContent = hours;
        minutes = 0;
    }
}

function pauseTimer() {
    console.log("pause");
    clearInterval(myClock_ms);
}

function clearTimer() {
    ms = 0;
    ms_display.textContent = ms + "0";
    seconds = 0;
    seconds_display.textContent = seconds + "0";
    minutes = 0;
    minutes_display.textContent = minutes + "0";
    hours = 0;
    hours_display.textContent = hours + "0";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
