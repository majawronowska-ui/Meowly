const user = JSON.parse(localStorage.getItem("meowlyUser"));

const loginButton = document.getElementById("loginButton");

if (user && loginButton) {
    loginButton.textContent = `Cześć, ${user.name} 👋`;
    loginButton.href = "profile.html";
}