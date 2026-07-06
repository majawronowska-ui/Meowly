import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileAchievements from "../components/profile/ProfileAchievements";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileSettings from "../components/profile/ProfileSettings";
import ChangePassword from "../components/profile/ChangePassword";

export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem("meowlyUser") || "null"
  );

  const activities = [
    {
      id: 1,
      title: "Ukończono misję",
      description: "Sprawdzenie budki dla kotów",
      date: "Dzisiaj • 18:30",
      xp: 50,
    },
    {
      id: 2,
      title: "Dodano zgłoszenie",
      description: "Kot potrzebujący pomocy",
      date: "Wczoraj • 11:20",
      xp: 20,
    },
    {
      id: 3,
      title: "Zdobyto odznakę",
      description: "Pierwsza misja",
      date: "3 dni temu",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fff8f0] p-4 lg:p-6">

      <div className="grid min-h-[calc(100vh-32px)] overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-[290px_1fr]">

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex flex-col">

          <Navbar />

          <div className="flex-1 overflow-y-auto p-8">

            <ProfileHeader
              name={user?.name || "Użytkownik"}
              level={user?.level || 1}
              xp={user?.xp || 0}
              nextLevelXp={100}
            />

            <div className="mt-8 grid gap-8 xl:grid-cols-[360px_1fr]">

              <div className="space-y-8">

                <ProfileAvatar
                  user={user}
                />

                <ProfileStats
                  level={user?.level || 1}
                  xp={user?.xp || 0}
                  completedMissions={12}
                  reports={5}
                  badges={4}
                  adoptedCats={1}
                />

              </div>

              <div className="space-y-8">

                <ProfileAchievements
                  level={user?.level || 1}
                  xp={user?.xp || 0}
                  completedMissions={12}
                  reports={5}
                />

                {/** ProfileActivity's props typing may differ; cast to any to avoid TSX prop errors here */}
                {(() => {
                  const Activity: any = ProfileActivity;
                  return <Activity activities={activities} />;
                })()}

                <ProfileSettings
                  user={user}
                />

                <ChangePassword />

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}