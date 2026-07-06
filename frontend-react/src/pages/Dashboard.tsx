import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");

  const xp = 0;
  const nextLevel = 100;
  const level = 1;

  return (
    <main className="min-h-screen bg-[#fff8f0] p-4 lg:p-6">

      <section className="grid min-h-[calc(100vh-48px)] overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-[290px_1fr]">

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex flex-col">

          <Navbar />

          <div className="space-y-8 p-6 lg:p-10">

            <div className="rounded-[36px] bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-white shadow-xl">

              <p className="font-semibold opacity-90">
                Witaj ponownie 👋
              </p>

              <h1 className="mt-2 text-4xl font-black lg:text-5xl">
                {user?.name || "Użytkownik"}
              </h1>

              <div className="mt-8 flex flex-wrap gap-6">

                <div>

                  <p className="text-sm opacity-80">
                    Poziom
                  </p>

                  <h2 className="text-5xl font-black">
                    {level}
                  </h2>

                </div>

                <div>

                  <p className="text-sm opacity-80">
                    XP
                  </p>

                  <h2 className="text-5xl font-black">
                    {xp}
                  </h2>

                </div>

              </div>

              <div className="mt-8">

                <div className="mb-2 flex justify-between text-sm font-bold">

                  <span>{xp} XP</span>

                  <span>{nextLevel} XP</span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-white/30">

                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{
                      width: `${(xp / nextLevel) * 100}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              <div className="card-hover rounded-3xl bg-orange-50 p-7 shadow-lg">

                <p className="font-bold text-orange-500">
                  Misje
                </p>

                <h2 className="mt-3 text-5xl font-black">
                  0
                </h2>

                <p className="mt-2 font-semibold text-slate-500">
                  ukończone
                </p>

              </div>

              <div className="card-hover rounded-3xl bg-orange-50 p-7 shadow-lg">

                <p className="font-bold text-orange-500">
                  Zgłoszenia
                </p>

                <h2 className="mt-3 text-5xl font-black">
                  0
                </h2>

                <p className="mt-2 font-semibold text-slate-500">
                  wysłane
                </p>

              </div>

              <div className="card-hover rounded-3xl bg-orange-50 p-7 shadow-lg">

                <p className="font-bold text-orange-500">
                  Odznaki
                </p>

                <h2 className="mt-3 text-5xl font-black">
                  0
                </h2>

                <p className="mt-2 font-semibold text-slate-500">
                  zdobyte
                </p>

              </div>

              <div className="card-hover rounded-3xl bg-orange-50 p-7 shadow-lg">

                <p className="font-bold text-orange-500">
                  Ranking
                </p>

                <h2 className="mt-3 text-5xl font-black">
                  —
                </h2>

                <p className="mt-2 font-semibold text-slate-500">
                  brak pozycji
                </p>

              </div>

            </div>
                        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">

              <div className="rounded-[36px] bg-white p-8 shadow-xl">

                <p className="font-black text-orange-500">
                  Najbliższa misja
                </p>

                <h2 className="mt-3 text-4xl font-black text-slate-900">
                  Sprawdź budkę dla kotów
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Zweryfikuj, czy budka jest czysta,
                  sucha i bezpieczna. Dodaj zdjęcie
                  po zakończeniu zadania.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <span className="rounded-full bg-orange-100 px-5 py-2 font-black text-orange-600">
                    +50 XP
                  </span>

                  <span className="rounded-full bg-slate-100 px-5 py-2 font-black text-slate-700">
                    300 m
                  </span>

                  <span className="rounded-full bg-slate-100 px-5 py-2 font-black text-slate-700">
                    Łatwa
                  </span>

                </div>

                <button
                  onClick={() => navigate("/map")}
                  className="btn mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 font-black text-white shadow-lg shadow-orange-200"
                >
                  Rozpocznij misję
                </button>

              </div>

              <div className="rounded-[36px] bg-white p-8 shadow-xl">

                <h2 className="text-2xl font-black">
                  Szybkie akcje
                </h2>

                <div className="mt-6 space-y-4">

                  <button
                    onClick={() => navigate("/map")}
                    className="btn flex h-16 w-full items-center justify-between rounded-2xl bg-orange-50 px-6 font-black hover:bg-orange-100"
                  >
                    <span>Mapa misji</span>

                    <span>📍</span>

                  </button>

                  <button
                    onClick={() => navigate("/profile")}
                    className="btn flex h-16 w-full items-center justify-between rounded-2xl bg-orange-50 px-6 font-black hover:bg-orange-100"
                  >
                    <span>Mój profil</span>

                    <span>👤</span>

                  </button>

                  <button
                    className="btn flex h-16 w-full items-center justify-between rounded-2xl bg-orange-50 px-6 font-black hover:bg-orange-100"
                  >
                    <span>Moje odznaki</span>

                    <span>🏅</span>

                  </button>

                  <button
                    className="btn flex h-16 w-full items-center justify-between rounded-2xl bg-orange-50 px-6 font-black hover:bg-orange-100"
                  >
                    <span>Ranking</span>

                    <span>🏆</span>

                  </button>

                </div>

              </div>

            </div>

            <div className="grid gap-8 xl:grid-cols-2">

              <div className="rounded-[36px] bg-white p-8 shadow-xl">

                <h2 className="text-3xl font-black">
                  Ostatnia aktywność
                </h2>

                <div className="mt-8 space-y-5">

                  <div className="rounded-2xl bg-orange-50 p-5">

                    <p className="font-black">
                      Brak wykonanych misji
                    </p>

                    <p className="mt-2 text-slate-500">
                      Zacznij pomagać kotom, aby zobaczyć historię aktywności.
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-[36px] bg-white p-8 shadow-xl">

                <h2 className="text-3xl font-black">
                  Ostatnie odznaki
                </h2>

                <div className="mt-8 grid grid-cols-2 gap-5">

                  <div className="rounded-3xl bg-orange-50 p-6 text-center">

                    <div className="text-5xl">
                      🐾
                    </div>

                    <h3 className="mt-4 font-black">
                      Brak
                    </h3>

                  </div>

                  <div className="rounded-3xl bg-orange-50 p-6 text-center">

                    <div className="text-5xl">
                      ⭐
                    </div>

                    <h3 className="mt-4 font-black">
                      Brak
                    </h3>

                  </div>

                </div>

              </div>

            </div>
                        <div className="rounded-[36px] bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-white shadow-xl">

              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <p className="font-semibold opacity-90">
                    Cel tygodnia
                  </p>

                  <h2 className="mt-2 text-4xl font-black">
                    Wykonaj 5 misji
                  </h2>

                  <p className="mt-4 max-w-xl leading-8 opacity-90">
                    Wykonuj misje w swojej okolicy i zdobywaj dodatkowe
                    doświadczenie oraz unikalne odznaki.
                  </p>

                </div>

                <div className="w-full max-w-sm">

                  <div className="mb-3 flex justify-between font-bold">

                    <span>0 / 5</span>

                    <span>0%</span>

                  </div>

                  <div className="h-4 overflow-hidden rounded-full bg-white/30">

                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{ width: "0%" }}
                    />

                  </div>

                  <button
                    onClick={() => navigate("/map")}
                    className="btn mt-8 h-14 w-full rounded-2xl bg-white font-black text-orange-600 shadow-lg"
                  >
                    Znajdź misję
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}