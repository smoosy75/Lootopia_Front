import banniere from "./assets/banniere.jpg";
import Card from "@/components/Card";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

function Home() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // ✅ Chasses classiques
  const cards = [
    {
      id: 1,
      title: "Chasse 1",
      description:
        "Venez découvrir le trésor caché du bâtiment 7 à Évry au parc aux lièvres, une aventure inoubliable vous attend !",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg",
    },
    {
      id: 2,
      title: "Chasse 2",
      description: "Une aventure mystique dans le centre historique de Paris vous attend.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiM6qu7Dr82p9O8bO4Nyjj4ZJz2Ymq2p9Dw&s",
    },
    {
      id: 3,
      title: "Chasse 3",
      description:
        "Explorez les secrets du parc des Buttes-Chaumont à Paris, une chasse pleine de surprises.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTunixK1_g2IGBweMCnSSldG5gtdWdtn2lz3A&s",
    },
    {
      id: 4,
      title: "Chasse 4",
      description:
        "Découvrez les trésors cachés du jardin des Tuileries, une chasse royale vous attend !",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLJ--tuuLU0dRDS8Ez4DxuJ_52OOnhpulWQ&s",
    },
  ];

  // ✅ Chasses personnalisées
  const customHunts = JSON.parse(localStorage.getItem("customHunts") || "[]");

  const customCards = customHunts.map((hunt, index) => ({
    id: `custom-${index}`,
    title: hunt.title, // ✅ bon champ
    description: hunt.description || "Chasse personnalisée créée par l’utilisateur.",
    image:
      hunt.image ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Pantheon_Paris.jpg/800px-Pantheon_Paris.jpg",
    isCustom: true,
    steps: hunt.steps,
  }));

  const allCards = [...cards, ...customCards];

  return (
    <div className="min-h-screen bg-[#283541]">
      {!isAuthenticated && <Header />}

      {/* Bannière */}
      <div className="flex items-center justify-center">
        <img
          src={banniere}
          alt="Bannière"
          className="w-full h-96 object-cover shadow-lg"
        />
      </div>

      {/* Bouton Créer une chasse */}
      {isAuthenticated &&
        (user?.role === "organisateur" || user?.role === "admin") && (
          <div className="text-center my-6">
            <Button
              onClick={() => navigate("/create")}
              className="bg-[#FAD99B] text-[#283541] font-bold px-6 py-2 rounded hover:bg-[#e6c17c]"
            >
              ➕ Créer une chasse personnalisée
            </Button>
          </div>
        )}

      {/* Carrousel */}
      <div className="container mx-auto pb-28 relative px-4 mt-10">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {allCards.map((card) => (
              <CarouselItem
                key={card.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="px-2">
                  <Card
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    isCustom={card.isCustom}
                    steps={card.steps}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4A606B] text-white hover:bg-[#3b4d57] rounded-full p-2 md:-translate-x-4" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4A606B] text-white hover:bg-[#3b4d57] rounded-full p-2 md:translate-x-4" />
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
