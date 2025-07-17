import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function CustomHuntGame() {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("currentCustomSteps");
    if (data) {
      setSteps(JSON.parse(data));
    }
  }, []);

  const handleAnswer = () => {
    const correctAnswer = steps[currentStep].answer.toLowerCase().trim();
    if (userAnswer.toLowerCase().trim() === correctAnswer) {
      setFeedback("✅ Bonne réponse !");
      setTimeout(() => {
        setFeedback("");
        setUserAnswer("");
        setCurrentStep((prev) => prev + 1);
      }, 1000);
    } else {
      setFeedback("❌ Mauvaise réponse. Réessaie !");
    }
  };

  if (!steps.length) {
    return <div className="text-center mt-10">Aucune étape chargée.</div>;
  }

  if (currentStep >= steps.length) {
    return (
      <div className="text-center mt-10 text-green-600 text-2xl font-bold">
        🎉 Félicitations ! Vous avez terminé la chasse !
      </div>
    );
  }

  const current = steps[currentStep];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-[#283541]">
          Étape {currentStep + 1}
        </h1>

        <p>
          <strong>Latitude :</strong> {current.lat}
        </p>
        <p>
          <strong>Longitude :</strong> {current.lng}
        </p>
        <p>
          <strong>Question :</strong> {current.question}
        </p>

        <input
          type="text"
          placeholder="Votre réponse"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />

        <Button onClick={handleAnswer} className="w-full bg-blue-600 text-white">
          Valider
        </Button>

        {feedback && (
          <p className="text-center font-semibold text-[#283541] mt-2">
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomHuntGame;
