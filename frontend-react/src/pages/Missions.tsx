import { useEffect, useState } from "react";
import {
  MapPin,
  Trophy,
  Clock,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

type Mission = {
  id: number;
  title: string;
  description?: string;
  location?: string;
  distance?: string;
  difficulty?: string;
  xp?: number;
  status?: string;
};

const API_URL = "https://meowly.onrender.com";

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMissions() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/missions`);

        if (!response.ok) {
          throw new Error("Nie udało się pobrać misji.");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setMissions(data);
        } else if (Array.isArray(data.missions)) {
          setMissions(data.missions);
        } else {
          setMissions([]);
        }
      } catch (err) {
        console.error(err);
        setError("Nie udało się wczytać misji. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    }

    loadMissions();
  }, []);

  function getDifficultyLabel(difficulty?: string) {
    switch (difficulty?.toLowerCase()) {
      case "łatwa":
      case "easy":
        return "Łatwa";

      case "średnia":
      case "medium":
        return "Średnia";

      case "trudna":
      case "hard":
        return "Trudna";

      default:
        return difficulty || "Łatwa";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 px-4 py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-center py-24">
          <LoaderCircle className="mr-3 h-7 w-7 animate-spin text-orange-500" />

          <p className="text-gray-600">Wczytywanie misji...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
            Pomagaj kotom w swojej okolicy
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Dostępne misje
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Wybierz zadanie, zdobądź punkty XP i realnie pomóż bezdomnym
            kotom.
          </p>
        </section>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />

            <p>{error}</p>
          </div>
        )}

        {!error && missions.length === 0 && (
          <div className="rounded-3xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <MapPin className="h-8 w-8 text-orange-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Brak aktywnych misji
            </h2>

            <p className="mt-2 text-gray-600">
              Nowe zadania pojawią się tutaj, gdy fundacje je dodadzą.
            </p>
          </div>
        )}

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <article
              key={mission.id}
              className="flex flex-col rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {getDifficultyLabel(mission.difficulty)}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {mission.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                {mission.description ||
                  "Pomóż fundacji wykonać tę misję i wesprzyj koty w potrzebie."}
              </p>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-orange-500" />

                  <span>{mission.location || "Warszawa"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-orange-500" />

                  <span>{mission.distance || "W pobliżu"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
                  <Trophy className="h-4 w-4" />

                  <span>+{mission.xp ?? 50} XP</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
                onClick={() => {
                  window.alert(`Wybrano misję: ${mission.title}`);
                }}
              >
                Zobacz misję
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}