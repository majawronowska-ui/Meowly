import { Link } from "react-router-dom";

const normalItems = [
  { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "Mapa", path: "/map", icon: "🗺️" },
  { name: "Misje", path: "/missions", icon: "🎯" },
  { name: "Adopcje", path: "/adoptions", icon: "🐱" },
  { name: "Fundacje", path: "/foundations", icon: "❤️" },
  { name: "Ranking", path: "/ranking", icon: "🏆" },
  { name: "Profil", path: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("meowlyUser") || "null");

  const items =
    user?.email === "maja.wronowska@interia.pl"
      ? [...normalItems, { name: "Admin", path: "/admin", icon: "🛠️" }]
      : normalItems;

  return (
    <aside className="w-72 bg-white p-8 shadow-xl">
      <h1 className="mb-10 text-3xl font-black text-orange-500">
        🐾 Meowly
      </h1>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 rounded-2xl px-5 py-4 font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}