import { useEffect, useState } from "react";
import Card from "@/components/Card";

function CustomHunt() {
  const [customHunts, setCustomHunts] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("customHunts");
    if (data) {
      setCustomHunts(JSON.parse(data));
    }
  }, []);

  return (
    <>
      {customHunts.map((hunt, index) => (
        <Card
          key={index}
          title={hunt.name}
          description="Chasse personnalisée"
          image="https://upload.wikimedia.org/wikipedia/commons/4/42/Parc_aux_Li%C3%A8vres_batiment_7_%C3%89vry.jpg"
          isCustom={true}
          steps={hunt.steps}
        />
      ))}
    </>
  );
}

export default CustomHunt;
