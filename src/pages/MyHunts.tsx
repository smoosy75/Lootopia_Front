import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, PlusCircle, Timer } from "lucide-react";

const hunts = [
  {
    id: 1,
    name: "Chasse au trésor de Paris",
    status: "En cours",
    progress: 60,
    players: 24,
    endDate: "2025-06-30",
  },
  {
    id: 2,
    name: "Chasse des mystères",
    status: "En attente",
    progress: 0,
    players: 12,
    endDate: "2025-07-10",
  },
];

const leaderboard = [
  { name: "Alice", score: 1200, avatar: "/avatars/alice.png" },
  { name: "Bob", score: 1100, avatar: "/avatars/bob.png" },
  { name: "Claire", score: 950, avatar: "/avatars/claire.png" },
];

const history = [
  { name: "Chasse de Lyon", date: "2025-05-10", rank: 2 },
  { name: "Chasse de Bordeaux", date: "2025-04-02", rank: 1 },
];

export default function MyHunts() {
  return (
    <div className="min-h-screen bg-[#283541] p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Chasses en cours */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Mes chasses en cours
            </h2>
            <Button
              variant="outline"
              className="gap-2 border-[#FAD99B] text-[#FAD99B] hover:bg-[#fad99b22]"
            >
              <PlusCircle className="w-4 h-4" />
              Nouvelle chasse
            </Button>
          </div>
          {hunts.length === 0 && (
            <Card className="bg-white/80">
              <CardContent>
                <p className="text-gray-500">Aucune chasse en cours.</p>
              </CardContent>
            </Card>
          )}
          <div className="flex flex-col gap-4">
            {hunts.map((hunt) => (
              <Card key={hunt.id} className="bg-white/90 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-[#283541]">
                      {hunt.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          hunt.status === "En cours" ? "default" : "secondary"
                        }
                        className={
                          hunt.status === "En cours"
                            ? "bg-[#FAD99B] text-[#283541]"
                            : "bg-gray-200 text-gray-700"
                        }
                      >
                        {hunt.status}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Timer className="w-3 h-3" /> Fin : {hunt.endDate}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-[#FAD99B] text-[#283541] hover:bg-[#e6c17c]"
                  >
                    Accéder
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {/* Barre de progression simple */}
                    <div className="w-1/2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FAD99B] h-2 rounded-full"
                        style={{ width: `${hunt.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {hunt.progress}%
                    </span>
                    <span className="ml-auto text-xs text-gray-400">
                      {hunt.players} joueurs
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Classement */}
        <div className="flex flex-col gap-6">
          <Card className="bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#283541]">
                <Trophy className="inline w-5 h-5 text-yellow-500 mr-2" />
                Classement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {leaderboard.map((user, idx) => (
                  <li key={user.name} className="flex items-center gap-3">
                    <span className="font-bold text-lg w-6 text-center text-[#FAD99B]">
                      {idx + 1}
                    </span>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#FAD99B]"
                    />
                    <span className="flex-1 text-[#283541]">{user.name}</span>
                    <span className="text-sm text-gray-500">
                      {user.score} pts
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Historique */}
          <Card className="bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#283541]">Historique</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {history.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="flex-1 text-[#283541]">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <Badge
                      variant="secondary"
                      className="bg-[#FAD99B] text-[#283541]"
                    >
                      #{item.rank}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
