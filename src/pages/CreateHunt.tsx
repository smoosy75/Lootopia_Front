import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function CreateHunt() {
  const [huntName, setHuntName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [steps, setSteps] = useState([
    { lat: "", lng: "", question: "", answer: "" },
  ]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddStep = () => {
    setSteps([...steps, { lat: "", lng: "", question: "", answer: "" }]);
  };

  const handleCreateHunt = () => {
    if (!huntName.trim() || !description.trim()) {
      setMessage("Le nom et la description sont requis.");
      return;
    }

    for (const step of steps) {
      if (!step.lat || !step.lng || !step.question || !step.answer) {
        setMessage("Veuillez remplir toutes les étapes.");
        return;
      }
    }

    const existing = JSON.parse(localStorage.getItem("customHunts") || "[]");

    const formattedSteps = steps.map((step) => ({
      lat: parseFloat(step.lat),
      lng: parseFloat(step.lng),
      question: step.question.trim(),
      answer: step.answer.trim().toLowerCase(),
    }));

    const newHunt = {
      id: Date.now(),
      title: huntName,
      description,
      image:
        imageUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg",
      steps: formattedSteps,
    };

    const updated = [...existing, newHunt];
    localStorage.setItem("customHunts", JSON.stringify(updated));
    setMessage("✅ Chasse créée avec succès !");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#283541]">
          Créer une chasse personnalisée
        </h1>

        {/* Nom de la chasse */}
        <div>
          <label className="block font-semibold mb-1">Nom de la chasse</label>
          <Input
            placeholder="Ex : Trésor de Paris"
            value={huntName}
            onChange={(e) => setHuntName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <Input
            placeholder="Un trésor caché dans les rues de Paris..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-1">Image (URL)</label>
          <Input
            placeholder="https://exemple.com/mon-image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Étapes */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Étapes de la chasse</h2>

          {steps.map((step, index) => (
            <div
              key={index}
              className="border p-4 rounded bg-gray-50 space-y-2"
            >
              <h3 className="font-semibold">Étape {index + 1}</h3>

              <Input
                placeholder="Latitude"
                value={step.lat}
                onChange={(e) => {
                  const updated = [...steps];
                  updated[index].lat = e.target.value;
                  setSteps(updated);
                }}
              />

              <Input
                placeholder="Longitude"
                value={step.lng}
                onChange={(e) => {
                  const updated = [...steps];
                  updated[index].lng = e.target.value;
                  setSteps(updated);
                }}
              />

              <Input
                placeholder="Question"
                value={step.question}
                onChange={(e) => {
                  const updated = [...steps];
                  updated[index].question = e.target.value;
                  setSteps(updated);
                }}
              />

              <Input
                placeholder="Réponse"
                value={step.answer}
                onChange={(e) => {
                  const updated = [...steps];
                  updated[index].answer = e.target.value;
                  setSteps(updated);
                }}
              />
            </div>
          ))}

          <Button
            type="button"
            onClick={handleAddStep}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Ajouter une étape
          </Button>
        </div>

        {/* Bouton de création */}
        <Button
          type="button"
          onClick={handleCreateHunt}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 w-full"
        >
          ✅ Créer la chasse
        </Button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default CreateHunt;
