import banniere from "./assets/banniere.jpg";
import Card from "@/components/Card";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

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
  const { isAuthenticated } = useAuth();

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
      description:
        "Venez découvrir le trésor caché du bâtiment 7 à Évry au parc aux lièvres, une aventure inoubliable vous attend !",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg",
    },
    {
      id: 3,
      title: "Chasse 3",
      description:
        "Venez découvrir le trésor caché du bâtiment 7 à Évry au parc aux lièvres, une aventure inoubliable vous attend !",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg",
    },
    {
      id: 4,
      title: "Chasse 4",
      description:
        "Venez découvrir le trésor caché du bâtiment 7 à Évry au parc aux lièvres, une aventure inoubliable vous attend !",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg",
    },
    {
      id: 5,
      title: "Chasse 5",
      description:
        "Venez découvrir le trésor caché du bâtiment 7 à Évry au parc aux lièvres, une aventure inoubliable vous attend !",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg",
    },
  ];

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

      {/* Carrousel */}
      <div className="container mx-auto pt-10 pb-28 relative px-4">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {cards.map((card) => (
              <CarouselItem
                key={card.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="px-2">
                  <Card
                    title={card.title}
                    description={card.description}
                    image={card.image}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Flèche précédente */}
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4A606B] text-white hover:bg-[#3b4d57] rounded-full p-2 md:-translate-x-4" />

          {/* Flèche suivante */}
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4A606B] text-white hover:bg-[#3b4d57] rounded-full p-2 md:translate-x-4" />
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
