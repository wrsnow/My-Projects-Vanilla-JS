const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
let drawing;
let velocity = 20;
let snakeMovement;
const score = document.querySelector("#score");

let foodLocation = {
    foodX: null,
    foodY: null,
};
let snake = {
    x: 200,
    y: 200,
    vx: 10,
    vy: 0,
    size: velocity,
    color: "black",
    quantity: 0,
    oldPositions: [],
    changeDirection(x, y) {
        this.vx = x;
        this.vy = y;
    },
    draw() {
        let index = this.oldPositions.findIndex(
            (el) => el[0] === this.x && el[1] === this.y
        );
        if (index >= 0) {
            clearInterval(snakeMovement);
            resetGame();
            alert("Game Over");
        }
        score.textContent = `Score: ${this.quantity}`;
        checkPositions();
        maxBorders();
        if (this.oldPositions.length > 0) {
            ctx.clearRect(
                this.oldPositions[0][0],
                this.oldPositions[0][1],
                this.size,
                this.size
            );
        }

        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        let randomColor = "grey";
        for (let pieces = 1; pieces < this.quantity + 1; pieces++) {
            let currentX =
                this.oldPositions[this.oldPositions.length - pieces][0];
            let currentY =
                this.oldPositions[this.oldPositions.length - pieces][1];
            ctx.fillStyle = randomColor;
            ctx.fillRect(currentX, currentY, this.size, this.size);
        }

        ctx.fillStyle = "red";
        ctx.fillRect(
            foodLocation.foodX,
            foodLocation.foodY,
            this.size,
            this.size
        );
    },
    update() {
        this.oldPositions = this.oldPositions.slice(
            this.oldPositions.length - this.quantity
        );
        this.oldPositions.push([this.x, this.y]);
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    },
};

resetGame();

function checkPositions() {
    if (snake.x === foodLocation.foodX && snake.y === foodLocation.foodY) {
        snake.quantity += 1;
        randomSquare();
    }
}

function randomSquare() {
    let maxWidth = Math.floor(canvas.width / velocity) - 2;
    let maxHeight = Math.floor(canvas.height / velocity) - 2;
    let randomX = Math.floor(Math.random() * maxWidth) * velocity;
    let randomY = Math.floor(Math.random() * maxHeight) * velocity;
    foodLocation = { foodX: randomX, foodY: randomY };
}

function maxBorders() {
    if (snake.x > canvas.width) {
        snake.x = 0;
    }
    if (snake.x < 0) {
        snake.x = canvas.width - velocity;
    }
    if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height;
    }
}

window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
        moveSnake(-velocity, 0);
    }
    if (e.key === "ArrowUp") {
        moveSnake(0, -velocity);
    }
    if (e.key === "ArrowRight") {
        moveSnake(velocity, 0);
    }
    if (e.key === "ArrowDown") {
        moveSnake(0, velocity);
    }
});

function moveSnake(x, y) {
    clearInterval(snakeMovement);
    snakeMovement = setInterval(() => {
        snake.changeDirection(x, y);
        snake.update();
        snake.draw();
    }, 60);
}

function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    randomSquare();
    snake.x = canvas.width / 2;
    snake.y = canvas.height / 2;
    snake.quantity = 0;
    snake.draw();
}

// function gradientColor() {
//     var my_gradient = ctx.createLinearGradient(
//         600,
//         0,
//         canvas.width,
//         canvas.height
//     );
//     my_gradient.addColorStop(0.2, "#472183");
//     my_gradient.addColorStop(0.4, "#4B56D2");
//     my_gradient.addColorStop(0.6, "#82C3EC");
//     my_gradient.addColorStop(0.8, "#f5f5f5");
//     return my_gradient;
// }

// function draw() {
//     console.log(canvas.width, canvas.height);
//     if (ball.x >= canvas.width) {
//         console.log("true");
//     }
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// window.addEventListener("keydown", (e) => {
//     e.preventDefault();
//     if (e.key === "ArrowLeft") {
//         moveSnake("x", -velocity);

//         // ball.x -= velocity;
//         // ball.draw();
//         // moveSnake();
//     }
//     if (e.key === "ArrowUp") {
//         moveSnake("y", -velocity);

//         // ball.y -= velocity;
//         // ball.draw();
//         // moveSnake();
//     }
//     if (e.key === "ArrowRight") {
//         moveSnake("x", velocity);

//         // ball.x += velocity;
//         // ball.draw();
//         // moveSnake();
//     }
//     if (e.key === "ArrowDown") {
//         moveSnake("y", velocity);
//     }
// });

// canvas.addEventListener("mousedown", (e) => {
//     e.preventDefault();
//     beginDrawing(e);
// });
// canvas.addEventListener("mouseup", (e) => {
//     e.preventDefault();
//     stopDrawing();
// });
// canvas.addEventListener("mousemove", (e) => {
//     e.preventDefault();

//     draw(e);
//     console.log();
// });

// function beginDrawing(e) {
//     drawing = true;
//     draw(e);
// }
// function stopDrawing() {
//     drawing = false;
//     ctx.beginPath();
// }

// function draw(e) {
//     console.log(e.clientX, e.clientY);
//     if (!drawing) return;
//     ctx.strokeStyle = colorPickerBox.value;
//     ctx.lineWidth = strokeWidthBox.value;
//     ctx.lineCap = "round";
//     ctx.lineTo(e.clientX, e.clientY);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(e.clientX, e.clientY);
// }
