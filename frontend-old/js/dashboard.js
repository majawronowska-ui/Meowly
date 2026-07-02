const user = JSON.parse(localStorage.getItem("meowlyUser"));

const helloUser = document.getElementById("helloUser");

if (!user) {
    window.location.href = "login.html";
} else {
    helloUser.textContent = `Cześć, ${user.name}!`;
}