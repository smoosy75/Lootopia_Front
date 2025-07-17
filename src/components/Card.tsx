import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Card({
  title,
  description,
  image,
  isCustom = false,
  steps = [],
}: {
  title: string;
  description: string;
  image: string;
  isCustom?: boolean;
  steps?: any[];
}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    const existing = JSON.parse(localStorage.getItem("customHunts") || "[]");
    const updated = existing.filter((hunt) => hunt.name !== title);
    localStorage.setItem("customHunts", JSON.stringify(updated));
    window.location.reload(); // recharge la page pour supprimer la tuile
  };

 const handlePlay = () => {
  if (isCustom) {
    const id = encodeURIComponent(title); // ou un ID unique si tu veux
    localStorage.setItem(`customSteps-${id}`, JSON.stringify(steps));
    navigate(`/custom-game/${id}`);
  } else {
    navigate("/game");
  }
};


  return (
    <>
      <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg border-4 border-[#D4AF37] bg-[#f5f5f5] hover:scale-105 transition-transform">
        <div className="bg-[#4A606B] text-white text-center py-3 relative">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover border-y-4 border-[#D4AF37]"
        />

        <div className="p-4 text-center">
          <p className="text-gray-800">{description}</p>
          <Button
            className="mt-4 bg-[#8e610c] text-white px-6 py-2 rounded-full hover:bg-[#2c562b]"
            onClick={() => setShowModal(true)}
          >
            Découvrir
          </Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl w-11/12 max-w-2xl relative">
            <img src={image} alt="Aperçu" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-4 text-[#4A606B]">
                {title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-center mb-6">
                {description}
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Retour
                </Button>
                <Button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handlePlay}
                >
                  Jouer
                </Button>
                {isCustom && (
                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    🗑️ Supprimer
                  </Button>
                )}
              </div>
            </div>
            <button
              className="absolute top-3 right-4 text-white text-xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
