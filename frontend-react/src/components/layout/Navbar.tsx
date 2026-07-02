export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("meowlyUser") || "{}");
    const avatar = user.avatar;
  return (
    <header className="flex items-center justify-between bg-white px-10 py-6 shadow-sm">
      <div>
        <h2 className="text-3xl font-black text-slate-900">
          Dzień dobry, {user.name || "Maja"} 👋
        </h2>

        <p className="mt-2 font-semibold text-slate-500">
          Miło Cię znowu widzieć.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button
            onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
            }}
            className="rounded-2xl bg-orange-50 px-4 py-3 font-black text-orange-600"
        >
            Wyloguj
        </button>
        
        <span className="text-2xl">🔔</span>

        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-orange-500 font-black text-white">
            {avatar ? (
                 <img
                    src={avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                />
            ) : (
                (user.name || "M").charAt(0)
            )}
        </div>
      </div>
    </header>
  );
}