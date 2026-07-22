const mapElement = document.getElementById("map");

if (!mapElement) {
    alert("Nie znaleziono elementu #map");
} else if (typeof L === "undefined") {
    alert("Leaflet się nie załadował");
} else if (typeof foundations === "undefined") {
    alert("Nie załadował się plik foundations.js");
} else {
    const map = L.map("map").setView([52.2297, 21.0122], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    foundations.forEach((foundation) => {
        L.marker([foundation.lat, foundation.lng])
            .addTo(map)
            .bindPopup(`
                <div class="foundation-popup">
                    <div class="popup-image">🐱</div>

                    <h3>${foundation.name}</h3>

                    <p>${foundation.description}</p>

                    <div class="popup-stats">
                        <span>🏠 ${foundation.cats} kotów</span>
                        <span>🎯 ${foundation.missions} misji</span>
                    </div>

                    <p><strong>📍 Miasto:</strong> ${foundation.city}</p>
                    <p><strong>🕒 Godziny:</strong> ${foundation.hours}</p>

                    <button class="popup-button">Zobacz profil</button>
                </div>
            `);
    });

    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}