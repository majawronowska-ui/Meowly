const missionForm = document.getElementById("mission-form");
const missionMessage = document.getElementById("mission-message");

missionForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const mission = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        difficulty: document.getElementById("difficulty").value,
        xp: Number(document.getElementById("xp").value),
        location: document.getElementById("location").value
    };

    const response = await fetch("http://127.0.0.1:8000/missions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mission)
    });

    const data = await response.json();

    if (data.success) {
        missionMessage.textContent = "Misja została dodana!";
        missionMessage.style.color = "green";
        missionForm.reset();
    } else {
        missionMessage.textContent = data.message || "Coś poszło nie tak.";
        missionMessage.style.color = "red";
    }
});