
import React, { useState } from "react";
import { Gift, User, Users, Shuffle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ParticipantsList from "@/components/ParticipantsList";
import DrawResult from "@/components/DrawResult";

const Index = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState("");

  const addParticipant = () => {
    if (!newParticipant.trim()) {
      toast.error("Por favor, insira um nome válido");
      return;
    }

    if (participants.includes(newParticipant.trim())) {
      toast.error("Este nome já foi adicionado");
      return;
    }

    setParticipants([...participants, newParticipant.trim()]);
    setNewParticipant("");
    toast.success("Participante adicionado!");
  };

  const removeParticipant = (index: number) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
    toast.success("Participante removido");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addParticipant();
    }
  };

  const drawParticipant = () => {
    if (participants.length < 2) {
      toast.error("Adicione pelo menos 2 participantes para realizar o sorteio");
      return;
    }

    const randomIndex = Math.floor(Math.random() * participants.length);
    setSelectedParticipant(participants[randomIndex]);
    setShowResult(true);
  };

  const resetDraw = () => {
    setShowResult(false);
    setSelectedParticipant("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center p-4">
      {!showResult ? (
        <>
          <header className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Gift className="h-10 w-10 text-festive-red mr-2 animate-bounce-light" />
              <h1 className="text-4xl font-bold text-festive-red">
                Amigo Secreto
              </h1>
              <Gift className="h-10 w-10 text-festive-red ml-2 animate-bounce-light" />
            </div>
            <p className="text-gray-600 max-w-md">
              Adicione os nomes dos participantes e realize o sorteio do seu amigo secreto!
            </p>
          </header>

          <Card className="w-full max-w-md p-6 shadow-lg border-2 border-festive-gold/20 rounded-xl animate-slide-up">
            <div className="mb-6">
              <label htmlFor="participant" className="block text-sm font-medium text-gray-700 mb-1">
                <User className="inline mr-1 h-4 w-4" /> Nome do Participante
              </label>
              <div className="flex gap-2">
                <Input
                  id="participant"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite um nome..."
                  className="flex-grow"
                />
                <Button
                  onClick={addParticipant}
                  variant="outline"
                  className="bg-festive-green hover:bg-festive-green/80 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ParticipantsList
              participants={participants}
              onRemove={removeParticipant}
            />

            <div className="mt-6">
              <Button
                onClick={drawParticipant}
                disabled={participants.length < 2}
                className="w-full bg-festive-red hover:bg-festive-red/80 text-white flex items-center justify-center gap-2"
              >
                <Shuffle className="h-5 w-5" />
                Sortear Amigo Secreto
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <DrawResult
          selectedParticipant={selectedParticipant}
          onReset={resetDraw}
        />
      )}
    </div>
  );
};

export default Index;
