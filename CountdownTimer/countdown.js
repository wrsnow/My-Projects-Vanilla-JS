const countDownDisplay = document.getElementById("timer");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

let Timer;
const Nwwew = "test";
let ms = 0;

function startTimer(hours, minutes, seconds) {
    Timer = setInterval(() => {
        countDownDisplay.textContent = `
				${hours <= 9 ? "0" + hours + "h" : hours + "h"}:${
            minutes <= 9 ? "0" + minutes + "m" : minutes + "m"
        }:${seconds <= 9 ? "0" + seconds + "s" : seconds + "s"}`;
        ms -= 1;
        if (ms <= 0 && seconds <= 0 && minutes <= 0 && hours <= 0) stopTimer();
        if (ms <= 0 && seconds >= 0) {
            if (seconds <= 0 && minutes >= 0) {
                if (minutes <= 0 && hours >= 0) {
                    if (hours === 0) return;
                    hours -= 1;
                    minutes = 60;
                }
                minutes--;
                seconds = 60;
            }
            ms = 100;
            seconds--;
        }
    }, 10);
}

const stopTimer = () => {
    countDownDisplay.textContent = "00:00:00:00";
    clearInterval(Timer);
};

const displayValues = () => {
    let HoursValue = Number(hoursInput.value);
    let MinutesValue = Number(minutesInput.value);
    let SecondsValue = Number(secondsInput.value);
    if (MinutesValue > 60 || SecondsValue > 60) {
        alert("Minutes or seconds cannot be greater than 60.");
    } else {
        clearInterval(Timer);
        startTimer(HoursValue, MinutesValue, SecondsValue);
    }
};
