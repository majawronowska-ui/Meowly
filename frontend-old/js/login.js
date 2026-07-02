const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("meowlyUser", JSON.stringify(data.user));
        loginMessage.textContent = "Zalogowano pomyślnie!";
        loginMessage.style.color = "green";

        setTimeout(() => {
    if (data.user.email === "maja.wronowska@interia.pl") {
        window.location.href = "admin.html";
    } else if (data.user.role === "foundation") {
        window.location.href = "foundation.html";
    } else {
        window.location.href = "dashboard.html";
    }
}, 1000);
    } else {
        loginMessage.textContent = data.message;
        loginMessage.style.color = "red";
    }
});