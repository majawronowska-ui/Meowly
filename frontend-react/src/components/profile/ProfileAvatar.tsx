import { useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import { api } from "../services/api";

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    level?: number;
    xp?: number;
  };

  onAvatarChanged?: (avatar: string) => void;
}

export default function ProfileAvatar({
  user,
  onAvatarChanged,
}: Props) {
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [loading, setLoading] = useState(false);

  async function uploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post(
        `/upload-avatar/${user.id}`,
        formData
      );

      const newAvatar = response.data.avatar;

      setAvatar(newAvatar);

      const updatedUser = {
        ...user,
        avatar: newAvatar,
      };

      localStorage.setItem(
        "meowlyUser",
        JSON.stringify(updatedUser)
      );

      onAvatarChanged?.(newAvatar);
    } catch (err) {
      console.error(err);
      alert("Nie udało się przesłać zdjęcia.");
    }

    setLoading(false);
  }

  return (
    <Card>

      <div className="flex flex-col items-center">

        <div className="mb-6 h-40 w-40 overflow-hidden rounded-full bg-orange-500 shadow-xl">

          {avatar ? (
            <img
              src={avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl font-black text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

        </div>

        <h2 className="text-3xl font-black text-slate-900">
          {user.name}
        </h2>

        <p className="mt-2 text-slate-500">
          {user.email}
        </p>

        <div className="mt-6 flex gap-3">

          <div className="rounded-2xl bg-orange-50 px-5 py-3 text-center">

            <p className="text-2xl font-black text-orange-500">
              {user.level ?? 1}
            </p>

            <span className="text-sm text-slate-500">
              Poziom
            </span>

          </div>

          <div className="rounded-2xl bg-orange-50 px-5 py-3 text-center">

            <p className="text-2xl font-black text-orange-500">
              {user.xp ?? 0}
            </p>

            <span className="text-sm text-slate-500">
              XP
            </span>

          </div>

        </div>

<<<<<<< HEAD
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={uploadAvatar}
        />

        <label htmlFor="avatar-upload" className="mt-8 block w-full">
          <Button
            type="button"
=======
        <label className="mt-8 w-full">

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadAvatar}
          />

          <Button
>>>>>>> cec5356ed2b769c9abaa9ee4fce381adfb43e1d7
            fullWidth
            loading={loading}
          >
            Zmień zdjęcie
          </Button>
<<<<<<< HEAD
=======

>>>>>>> cec5356ed2b769c9abaa9ee4fce381adfb43e1d7
        </label>

      </div>

    </Card>
  );
}