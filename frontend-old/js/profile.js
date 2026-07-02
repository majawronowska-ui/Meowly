const user = JSON.parse(localStorage.getItem("meowlyUser"));

if (!user) {
    window.location.href = "login.html";
} else {
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileRole").textContent = user.role;
    document.getElementById("profileXp").textContent = `${user.xp} XP`;
}