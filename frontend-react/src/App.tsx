import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import catImage from "./assets/register-cat.jpg";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-center rounded-[36px] bg-white p-10 text-center shadow-2xl">
        <h1 className="text-6xl font-black text-slate-900">🐾 Meowly</h1>

        <p className="mt-6 max-w-xl text-xl font-semibold text-slate-600">
          Pomagaj kotom w swojej okolicy, wykonuj misje i zdobywaj XP.
        </p>

        <div className="mt-10 flex gap-4">
          <Link to="/register" className="rounded-2xl bg-orange-500 px-8 py-4 font-black text-white shadow-lg shadow-orange-200">
            Zarejestruj się
          </Link>

          <Link to="/login" className="rounded-2xl bg-orange-50 px-8 py-4 font-black text-orange-600">
            Zaloguj się
          </Link>
        </div>
      </section>
    </main>
  );
}

function Register() {
  const [message, setMessage] = useState("");
  const [accountType, setAccountType] = useState("user");

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const user = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      role: "user",
    };

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.success) {
      setMessage(data.message || "Konto zostało utworzone. Sprawdź e-mail.");
    } else {
      setMessage(data.message || "Nie udało się utworzyć konta.");
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="grid min-h-[calc(100vh-48px)] grid-cols-1 overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="relative flex flex-col justify-between overflow-hidden bg-orange-50 p-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,248,240,.15), rgba(255,248,240,.25)), url(${catImage})`,
            backgroundSize: "cover",
            backgroundPosition: "12% center",
          }}
        >
          <div className="text-3xl font-black text-slate-900">🐾 Meowly</div>

          <div className="relative z-10 ml-4 max-w-lg">
            <h1 className="text-6xl font-black leading-none text-slate-900">
              Razem zmieniamy los <span className="text-orange-500">kotów.</span>
            </h1>

            <p className="mt-6 text-lg font-semibold leading-8 text-slate-900 drop-shadow">
              Dołącz do społeczności Meowly i pomagaj kotom w swojej okolicy.
            </p>
          </div>

          <div className="grid gap-4 rounded-[28px] bg-white/80 p-5 shadow-xl backdrop-blur md:grid-cols-3">
            <div>
              <div className="mb-3 text-3xl">📍</div>
              <h3 className="font-black text-slate-900">Pomagaj lokalnie</h3>
              <p className="mt-2 text-sm text-slate-600">Wykonuj misje i wspieraj fundacje.</p>
            </div>

            <div>
              <div className="mb-3 text-3xl">⭐</div>
              <h3 className="font-black text-slate-900">Zdobywaj XP</h3>
              <p className="mt-2 text-sm text-slate-600">Awansuj, zdobywaj odznaki i poziomy.</p>
            </div>

            <div>
              <div className="mb-3 text-3xl">🧡</div>
              <h3 className="font-black text-slate-900">Ratuj życie</h3>
              <p className="mt-2 text-sm text-slate-600">Każda Twoja akcja ma realny wpływ.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md rounded-[36px] bg-white p-10 shadow-xl">
            <h2 className="text-center text-5xl font-black text-slate-900">
              Załóż konto
            </h2>

            <p className="mt-3 text-center font-semibold text-slate-500">
              To zajmie tylko chwilę!
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-5">
              <div>
                <label className="font-black text-slate-800">Typ konta</label>

                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("user")}
                    className={`h-14 rounded-2xl font-black ${
                      accountType === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    Użytkownik
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("foundation")}
                    className={`h-14 rounded-2xl font-black ${
                      accountType === "foundation"
                        ? "bg-orange-500 text-white"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    Fundacja
                  </button>
                </div>
              </div>

              <div>
                <label className="font-black text-slate-800">
                  {accountType === "foundation" ? "Nazwa fundacji" : "Imię"}
                </label>
                <input
                  name="name"
                  className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none transition focus:border-orange-500"
                  placeholder={accountType === "foundation" ? "Nazwa fundacji" : "Twoje imię"}
                  required
                />
              </div>

              <div>
                <label className="font-black text-slate-800">Email</label>
                <input
                  name="email"
                  type="email"
                  className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none transition focus:border-orange-500"
                  placeholder="twoj@email.com"
                  required
                />
              </div>

              <div>
                <label className="font-black text-slate-800">Hasło</label>
                <input
                  name="password"
                  type="password"
                  className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none transition focus:border-orange-500"
                  placeholder="Minimum 6 znaków"
                  required
                />
              </div>

              <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 font-black text-white shadow-lg shadow-orange-200 transition hover:scale-[1.01]">
                Zarejestruj się
              </button>

              {message && (
                <p className="text-center font-bold text-orange-600">
                  {message}
                </p>
              )}
            </form>

            <p className="mt-7 text-center font-semibold text-slate-500">
              Masz już konto?{" "}
              <Link to="/login" className="font-black text-orange-500">
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const user = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };

    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("meowlyUser", JSON.stringify(data.user));
      if (data.user.email === "maja.wronowska@interia.pl") {
        navigate("/admin");
      } else if (data.user.role === "foundation") {
        navigate("/foundation");
      } else {
        navigate("/dashboard");
      }
    } else {
      setMessage(data.message || "Nie udało się zalogować.");
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="flex min-h-[calc(100vh-48px)] items-center justify-center rounded-[36px] bg-white shadow-2xl">
        <div className="w-full max-w-md rounded-[36px] bg-white p-10 shadow-xl">
          <h1 className="text-center text-5xl font-black text-slate-900">Zaloguj się</h1>

          <p className="mt-3 text-center font-semibold text-slate-500">
            Wróć do swoich misji i XP.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="font-black text-slate-800">Email</label>
              <input name="email" type="email" required className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none focus:border-orange-500" placeholder="twoj@email.com" />
            </div>

            <div>
              <label className="font-black text-slate-800">Hasło</label>
              <input name="password" type="password" required className="mt-2 h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none focus:border-orange-500" placeholder="••••••••" />
            </div>

            <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 font-black text-white shadow-lg shadow-orange-200">
              Zaloguj się
            </button>

            {message && (
              <p className="text-center font-bold text-red-500">{message}</p>
            )}
          </form>

          <p className="mt-7 text-center font-semibold text-slate-500">
            Nie masz konta?{" "}
            <Link to="/register" className="font-black text-orange-500">
              Zarejestruj się
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function Dashboard() {
  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="grid min-h-[calc(100vh-48px)] grid-cols-[288px_1fr] overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <Sidebar />

        <div className="flex flex-col">
          <Navbar />

          <section className="p-10">
            <div className="rounded-[32px] bg-orange-50 p-7">
              <h2 className="text-2xl font-black text-slate-900">
                Poziom 1 — Odkrywca Kotów
              </h2>
              <p className="mt-2 font-bold text-slate-600">0 / 100 XP</p>

              <div className="mt-5 h-4 overflow-hidden rounded-full bg-orange-100">
                <div className="h-full w-[0%] rounded-full bg-orange-500" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-5">
              <div className="col-span-2 row-span-2 rounded-[32px] bg-white p-7 shadow-xl">
                <p className="font-black text-orange-500">Najbliższa misja</p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  Sprawdź budkę dla kotów
                </h2>
                <p className="mt-3 text-lg font-semibold leading-8 text-slate-600">
                  Zweryfikuj, czy budka jest czysta, sucha i bezpieczna.
                </p>
                <p className="mt-5 font-black text-orange-500">+50 XP • 300 m</p>

                <button className="mt-7 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 py-4 font-black text-white shadow-lg shadow-orange-200">
                  Rozpocznij misję
                </button>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-xl">
                <h3 className="font-black text-slate-900">Misje</h3>
                <p className="mt-3 text-5xl font-black text-orange-500">0</p>
                <span className="font-bold text-slate-500">ukończone</span>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-xl">
                <h3 className="font-black text-slate-900">Zgłoszenia</h3>
                <p className="mt-3 text-5xl font-black text-orange-500">0</p>
                <span className="font-bold text-slate-500">wysłane</span>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-xl">
                <h3 className="font-black text-slate-900">Odznaki</h3>
                <p className="mt-3 text-5xl font-black text-orange-500">0</p>
                <span className="font-bold text-slate-500">zdobyte</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function MapPage() {
  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="grid min-h-[calc(100vh-48px)] grid-cols-[288px_1fr] overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <Sidebar />

        <div className="flex flex-col">
          <Navbar />

          <section className="p-8">
            <h1 className="text-4xl font-black text-slate-900">
              Mapa Meowly
            </h1>

            <p className="mt-2 font-semibold text-slate-500">
              Fundacje, misje i zgłoszenia w Twojej okolicy.
            </p>

            <div className="mt-6 h-[650px] overflow-hidden rounded-[32px] shadow-xl">
              <MapContainer
                center={[52.2297, 21.0122]}
                zoom={12}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[52.2297, 21.0122]}>
                  <Popup>
                    <strong>Fundacja Koci Pazur</strong>
                    <br />
                    Warszawa
                    <br />
                    6 aktywnych misji
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}




function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    alert("Wybrano zdjęcie");

    const file = event.target.files?.[0];
    const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");

    console.log("FILE:", file);
    console.log("USER:", user);

    if (!file) {
      alert("Nie wybrano pliku");
      return;
    }

    if (!user || !user.id) {
      alert("Brak zalogowanego użytkownika");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`http://127.0.0.1:8000/upload-avatar/${user.id}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("AVATAR RESPONSE:", data);

    if (data.success) {
      const updatedUser = {
        ...user,
        avatar: data.avatar,
      };

      localStorage.setItem("meowlyUser", JSON.stringify(updatedUser));
      setAvatar(data.avatar);

      alert("Zdjęcie zapisane!");
    } else {
      alert(data.message || "Nie udało się zapisać zdjęcia");
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="grid min-h-[calc(100vh-48px)] grid-cols-[288px_1fr] overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <Sidebar />

        <div className="flex flex-col">
          <Navbar />

          <section className="p-10">
            <h1 className="text-5xl font-black text-slate-900">
              Twój profil
            </h1>

            <div className="mt-8 grid grid-cols-[360px_1fr] gap-8">
              <div className="rounded-[36px] bg-orange-50 p-8 text-center shadow-xl">
                <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-orange-500 text-6xl font-black text-white">
                  {avatar ? (
                    <img src={avatar} className="h-full w-full object-cover" />
                  ) : (
                    user?.name?.charAt(0) || "M"
                  )}
                </div>

                <h2 className="mt-5 text-3xl font-black text-slate-900">
                  {user?.name || "Użytkownik"}
                </h2>

                <p className="mt-2 font-bold text-slate-500">
                  {user?.email}
                </p>

                <label className="mt-6 inline-block cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 font-black text-white shadow-lg shadow-orange-200">
                  Zmień zdjęcie
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-6">
                <div className="rounded-[36px] bg-white p-8 shadow-xl">
                  <h2 className="text-3xl font-black text-slate-900">
                    Poziom 1 — Odkrywca Kotów
                  </h2>

                  <p className="mt-2 font-bold text-slate-500">
                    0 / 100 XP
                  </p>

                  <div className="mt-5 h-4 overflow-hidden rounded-full bg-orange-100">
                    <div className="h-full w-[0%] bg-orange-500" />
                  </div>
                </div>

                <div className="rounded-[36px] bg-white p-8 shadow-xl">
                  <h2 className="text-3xl font-black text-slate-900">
                    Zmień hasło
                  </h2>

                  <form className="mt-6 space-y-4">
                    <input
                      type="password"
                      placeholder="Obecne hasło"
                      className="h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none focus:border-orange-500"
                    />

                    <input
                      type="password"
                      placeholder="Nowe hasło"
                      className="h-14 w-full rounded-2xl border-2 border-orange-200 px-5 outline-none focus:border-orange-500"
                    />

                    <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 font-black text-white shadow-lg shadow-orange-200">
                      Zapisz nowe hasło
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function VerifiedPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl rounded-[40px] bg-white p-12 text-center shadow-2xl">

        <img
          src={catImage}
          alt="Kot"
          className="mx-auto h-64 w-64 rounded-full object-cover shadow-xl"
        />

        <h1 className="mt-8 text-5xl font-black text-slate-900">
          🎉 Konto aktywowane!
        </h1>

        <p className="mt-6 text-xl leading-8 text-slate-600">
          Twój adres e-mail został pomyślnie potwierdzony.
          <br />
          Witamy w społeczności <span className="font-black text-orange-500">Meowly</span>.
        </p>

        <div className="mt-10 rounded-3xl bg-orange-50 p-6">
          <h2 className="text-2xl font-black text-slate-900">
            Co dalej?
          </h2>

          <div className="mt-5 space-y-3 text-left font-semibold text-slate-600">
            <p>🐾 Wykonuj misje i pomagaj kotom.</p>
            <p>⭐ Zdobywaj XP i awansuj.</p>
            <p>🏆 Rywalizuj z innymi użytkownikami.</p>
            <p>❤️ Wspieraj fundacje i schroniska.</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="mt-10 h-16 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 text-xl font-black text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
        >
          Przejdź do logowania
        </button>
      </div>
    </main>
  );
}

function AdminPage() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");

  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [xp, setXp] = useState(10);

  if (user?.email !== "maja.wronowska@interia.pl") {
    return (
      <main className="min-h-screen bg-[#fff8f0] p-6">
        <section className="flex min-h-[calc(100vh-48px)] items-center justify-center rounded-[36px] bg-white shadow-2xl">
          <div className="rounded-[36px] bg-orange-50 p-10 text-center shadow-xl">
            <h1 className="text-4xl font-black text-slate-900">Brak dostępu</h1>
            <p className="mt-4 font-semibold text-slate-600">
              Ten panel jest dostępny tylko dla administratora.
            </p>
          </div>
        </section>
      </main>
    );
  }

  function handleDifficultyChange(value: string) {
    setDifficulty(value);
    if (value === "easy") setXp(10);
    if (value === "medium") setXp(15);
    if (value === "hard") setXp(20);
  }

  async function loadUsers() {
    const response = await fetch("http://127.0.0.1:8000/admin/users");
    const data = await response.json();
    setUsers(data);
  }

  async function deleteUser(userId: number) {
    const confirmDelete = confirm("Czy na pewno chcesz usunąć tego użytkownika?");
    if (!confirmDelete) return;

    const response = await fetch(`http://127.0.0.1:8000/admin/users/${userId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Użytkownik został usunięty.");
      loadUsers();
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8f0] p-6">
      <section className="grid min-h-[calc(100vh-48px)] grid-cols-[288px_1fr] overflow-hidden rounded-[36px] bg-white shadow-2xl">
        <Sidebar />

        <div className="flex flex-col">
          <Navbar />

          <section className="p-10">
            <h1 className="text-5xl font-black text-slate-900">
              Panel administratora
            </h1>

            <p className="mt-3 font-semibold text-slate-500">
              Zarządzaj misjami, fundacjami, adopcjami i użytkownikami.
            </p>

            <div className="mt-8 rounded-[36px] bg-white p-8 shadow-xl">
              <h2 className="text-3xl font-black text-slate-900">
                Dodaj misję
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => handleDifficultyChange("easy")}
                  className={`rounded-3xl p-5 text-left font-black ${
                    difficulty === "easy"
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-slate-800"
                  }`}
                >
                  Łatwe zadanie
                  <p className="mt-2 text-3xl">10 XP</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleDifficultyChange("medium")}
                  className={`rounded-3xl p-5 text-left font-black ${
                    difficulty === "medium"
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-slate-800"
                  }`}
                >
                  Średnie zadanie
                  <p className="mt-2 text-3xl">15 XP</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleDifficultyChange("hard")}
                  className={`rounded-3xl p-5 text-left font-black ${
                    difficulty === "hard"
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-slate-800"
                  }`}
                >
                  Trudne zadanie
                  <p className="mt-2 text-3xl">20 XP</p>
                </button>
              </div>

              <p className="mt-5 font-black text-orange-600">
                Wybrano: {xp} XP
              </p>
            </div>

            <div className="mt-8 rounded-[36px] bg-white p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-900">
                  Użytkownicy
                </h2>

                <button
                  type="button"
                  onClick={loadUsers}
                  className="rounded-2xl bg-orange-500 px-6 py-4 font-black text-white"
                >
                  Odśwież
                </button>
              </div>

              {message && (
                <p className="mt-4 font-bold text-orange-600">{message}</p>
              )}

              <div className="mt-6 space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-3xl bg-orange-50 p-5"
                  >
                    <div>
                      <h3 className="font-black text-slate-900">{user.name}</h3>
                      <p className="font-semibold text-slate-500">
                        {user.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteUser(user.id)}
                      className="rounded-2xl bg-red-500 px-5 py-3 font-black text-white"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/verified" element={<VerifiedPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
