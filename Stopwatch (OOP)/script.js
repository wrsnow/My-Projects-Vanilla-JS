const display = document.getElementById("display-time");

class Stopwatch {
    constructor(htmlElement) {
        this.milliseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.interval = null;
        this.htmlElement = htmlElement;
    }
    start() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.milliseconds++;
            if (this.milliseconds > 99) {
                this.increaseSeconds();
            }
            this.htmlElement.textContent = this.showCurrentTime();
        }, 10);
    }
    pause() {
        clearInterval(this.interval);
    }
    stop() {
        clearInterval(this.interval);
        this.resetStopwatch();
    }
    resetStopwatch() {
        this.milliseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.htmlElement.textContent = "--:--:--:--";
    }
    showCurrentTime() {
        let ms =
            this.milliseconds >= 10
                ? this.milliseconds
                : "0" + this.milliseconds;
        let s = this.seconds >= 10 ? this.seconds : "0" + this.seconds;
        let m = this.minutes >= 10 ? this.minutes : "0" + this.minutes;
        let h = this.hours >= 10 ? this.hours : "0" + this.hours;
        return `${h}:${m}:${s}:${ms}`;
    }
    increaseSeconds() {
        this.milliseconds = 0;
        this.seconds++;
        if (this.seconds >= 60) {
            this.increaseMinutes();
        }
    }
    increaseMinutes() {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes >= 60) {
            this.increaseHours();
        }
    }
    increaseHours() {
        this.minutes = 0;
        this.hours++;
    }
}
let stopwatch = new Stopwatch(display);

const stopBTN = document.getElementById("stop-btn"),
    pauseBTN = document.getElementById("pause-btn"),
    startBTN = document.getElementById("start-btn");

stopBTN.addEventListener("click", (e) => {
    stopwatch.stop();
});
pauseBTN.addEventListener("click", (e) => {
    stopwatch.pause();
});
startBTN.addEventListener("click", (e) => {
    stopwatch.start();
});
