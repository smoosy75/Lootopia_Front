import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  {
    position: [48.8566, 2.3522], // Paris
    question: "Quelle est la capitale de la France ?",
    answer: "paris",
  },
  {
    position: [48.8606, 2.3376], // Musée du Louvre
    question: "Quel musée célèbre se trouve ici ?",
    answer: "louvre",
  },
  {
    position: [48.8738, 2.2950], // Arc de Triomphe
    question: "Quel monument célèbre se trouve ici ?",
    answer: "arc de triomphe",
  },
];

export default function TreasureHunt() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [completed, setCompleted] = useState(false);

  const step = steps[currentStep];

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const dx = e.latlng.lat - step.position[0];
        const dy = e.latlng.lng - step.position[1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.0015) {
          setShowQuestion(true);
        } else {
          alert(
            dist < 0.01
              ? "Tu es proche !"
              : "Tu es trop loin... essaie ailleurs !"
          );
        }
      },
    });
    return null;
  }

  function validateAnswer() {
    if (answerInput.trim().toLowerCase() === step.answer) {
      if (currentStep === steps.length - 1) {
        setCompleted(true);
      } else {
        setCurrentStep(currentStep + 1);
        setShowQuestion(false);
        setAnswerInput("");
      }
    } else {
      alert("Mauvaise réponse. Réessaye !");
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Chasse au Trésor – Étape {currentStep + 1}</h1>
      </header>

      {completed ? (
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <p className="text-3xl text-green-600 mb-4">🎉 Trésor final trouvé ! 🎉</p>
          <Button onClick={() => {
            setCurrentStep(0);
            setAnswerInput("");
            setShowQuestion(false);
            setCompleted(false);
          }}>
            Rejouer
          </Button>
        </div>
      ) : (
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2">
          {/* Carte */}
          <MapContainer center={step.position as [number, number]} zoom={15} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={step.position} />
            <MapClickHandler />
          </MapContainer>

          {/* Zone de question */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100">
            {!showQuestion ? (
              <p className="text-gray-700 text-center">
                Clique sur la carte pour trouver l'étape {currentStep + 1} !
              </p>
            ) : (
              <div className="w-full max-w-md text-center space-y-4">
                <p className="text-lg font-semibold">{step.question}</p>
                <Input
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Votre réponse"
                />
                <Button onClick={validateAnswer}>Valider</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
