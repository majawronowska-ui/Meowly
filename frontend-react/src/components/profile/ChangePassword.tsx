import { useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../services/api";

export default function ChangePassword() {
  const user = JSON.parse(
    localStorage.getItem("meowlyUser") || "null"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setMessage("");

    if (!currentPassword || !newPassword || !repeatPassword) {
      setMessage("Uzupełnij wszystkie pola.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Hasło musi mieć minimum 6 znaków.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setMessage("Nowe hasła nie są takie same.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        `/users/${user.id}/password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        setMessage("Hasło zostało zmienione.");

        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
      } else {
        setMessage(
          response.data.message ||
            "Nie udało się zmienić hasła."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("Wystąpił błąd serwera.");
    }

    setLoading(false);
  }

  return (
    <Card>

      <h2 className="text-2xl font-black text-slate-900">
        Zmień hasło
      </h2>

      <p className="mt-2 text-slate-500">
        Dla bezpieczeństwa podaj obecne hasło.
      </p>

      <div className="mt-6 space-y-4">

        <Input
          label="Obecne hasło"
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
        />

        <Input
          label="Nowe hasło"
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <Input
          label="Powtórz nowe hasło"
          type="password"
          value={repeatPassword}
          onChange={(e) =>
            setRepeatPassword(e.target.value)
          }
        />

        {message && (
          <p className="font-semibold text-orange-600">
            {message}
          </p>
        )}

        <Button
          fullWidth
          loading={loading}
          onClick={handleSubmit}
        >
          Zapisz nowe hasło
        </Button>

      </div>

    </Card>
  );
}