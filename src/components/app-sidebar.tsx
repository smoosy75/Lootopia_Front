import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function getNavMainByRole(role: string) {
  if (role === "admin") {
    return [
      { title: "Accueil", url: "/", icon: SquareTerminal },
      { title: "Dashboard", url: "/admin", icon: SquareTerminal },
      { title: "Gestion des utilisateurs", url: "/admin/users", icon: Bot },
      { title: "Statistiques globales", url: "/admin/stats", icon: PieChart },
      {
        title: "Modération des contenus",
        url: "/admin/moderation",
        icon: BookOpen,
      },
    ];
  }
  if (role === "organisateur") {
    return [
      { title: "Accueil", url: "/", icon: SquareTerminal },
      { title: "Mes chasses", url: "/organizer/hunts", icon: Map },
      {
        title: "Créer une chasse",
        url: "/organizer/hunts/create",
        icon: Command,
      },
      {
        title: "Récompenses organisateur",
        url: "/organizer/rewards",
        icon: PieChart,
      },
      { title: "Partenaires", url: "/organizer/partners", icon: AudioWaveform },
    ];
  }
  if (role === "joueur") {
    return [
      { title: "Accueil", url: "/", icon: SquareTerminal },
      { title: "Mes chasses", url: "/user/hunts", icon: Map },
      { title: "Récompenses", url: "/user/rewards", icon: PieChart },
      { title: "Boutique", url: "/user/shop", icon: GalleryVerticalEnd },
    ];
  }
  return [];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const teams = [
    {
      name: user?.name || "Lootopia",
      logo: GalleryVerticalEnd, // ou un logo par défaut
      plan: user?.role || "",
    },
  ];

  const navMain = getNavMainByRole(user?.role || "");

  const handleNav = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navMain.map((item) => ({
            ...item,
            onClick: handleNav(item.url),
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "",
            email: user?.email || "",
            avatar: "/avatars/shadcn.jpg", // à remplacer plus tard
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
