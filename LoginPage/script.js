let Users = [
    {
        username: "admin",
        password: "admin",
    },
];
let currentUser = "";
let isLoggedIn = false;

$(() => {
    $("#submitBTN").on("click", function (e) {
        e.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();

        if (!username || !password) {
            return alert("Please enter a username and password");
        }
        if (checkAccount(username, password)) {
            currentUser = username;
            renderWelcomeMessage();
            return;
        } else {
            return;
        }
    });
    $("#signup-submitBTN").on("click", function (e) {
        e.preventDefault();
        createAccount(e);
    });
});

function checkAccount(username, password) {
    let isValid = Users.find(
        (user) => user.username === username && user.password === password
    );
    return !!isValid;
}
function checkUsername(username) {
    let isValid = Users.find((user) => user.username === username);
    return !!isValid;
}

function renderWelcomeMessage() {
    $("#main-body").html(
        `<h1 class='text-dark text-center'>Welcome ${currentUser}.</h1>`
    );
}

function createAccount(e) {
    let username = $("#signup-username").val();
    let password = $("#signup-password").val();
    let repeatPassword = $("#signup-repassword").val();
    if (!username || !password || !repeatPassword) {
        return alert("Please fullfil all fields.");
    }
    if (password !== repeatPassword) {
        $("#signup-password").addClass("is-invalid");
        $("#signup-repassword").addClass("is-invalid");
        return alert("Password does not match.");
    }
    if (checkUsername(username)) {
        return alert("Username already taken.");
    }
    Users.push({ username: username, password: password });
    document.getElementById("pills-signup").reset();
    $("#signup-password").removeClass("is-invalid");
    $("#signup-repassword").removeClass("is-invalid");
    return alert("Account created successfully.");
}
