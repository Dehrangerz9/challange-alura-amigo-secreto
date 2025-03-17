
import React from "react";
import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParticipantsListProps {
  participants: string[];
  onRemove: (index: number) => void;
}

const ParticipantsList = ({ participants, onRemove }: ParticipantsListProps) => {
  if (participants.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6 border-2 border-dashed border-gray-200 rounded-lg">
        <Users className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-2">Nenhum participante adicionado</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        <Users className="h-4 w-4 mr-1" />
        <h3 className="text-sm font-medium">
          Participantes ({participants.length})
        </h3>
      </div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {participants.map((participant, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg animate-fade-in"
          >
            <span className="font-medium">{participant}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
