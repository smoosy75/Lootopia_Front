import { Link } from "react-router-dom";
import logo from "../assets/lootopia_logo.png";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // À adapter selon ton contexte utilisateur
  const username = "Admin Demo";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-[#26323E] text-white flex items-center justify-between px-4 py-3 lg:px-8 lg:py-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Lootopia Logo" className="h-10" />
        </Link>
      </div>

      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 bg-[#FAD99B] text-[#26323E] font-bold rounded-full cursor-pointer">
            {getInitials(username)}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white text-[#26323E] mt-2">
            <DropdownMenuItem onClick={handleLogout}>
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          to="/login"
          className="bg-[#FAD99B] text-[#26323E] font-bold py-2 px-4 rounded hover:bg-[#f9c78a] transition"
        >
          Connexion
        </Link>
      )}
    </header>
  );
}

export default Header;
