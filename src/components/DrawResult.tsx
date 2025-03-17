
import React, { useEffect, useState } from "react";
import { Gift, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface DrawResultProps {
  selectedParticipant: string;
  onReset: () => void;
}

const DrawResult = ({ selectedParticipant, onReset }: DrawResultProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pequeno atraso para efeito dramático
    const timer = setTimeout(() => {
      setVisible(true);
      
      // Dispara confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-4xl flex flex-col items-center justify-center text-center p-4">
      <div className="animate-fade-in">
        <div className="mb-4">
          <Gift className="h-16 w-16 text-festive-red mx-auto animate-bounce-light" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          O sorteado foi:
        </h2>
        
        {visible ? (
          <div className="animate-zoom-in">
            <h1 className="text-6xl md:text-8xl font-bold text-festive-green mb-8 drop-shadow-md">
              {selectedParticipant}
            </h1>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
        
        <Button
          onClick={onReset}
          className="mt-8 bg-festive-gold hover:bg-festive-gold/80 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default DrawResult;
