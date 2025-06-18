import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PokemonTypeBadge from "../commons/PokemonTypeBadge";
import { GripVertical } from "lucide-react";

const SortablePokemonItem = ({ pokemon }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pokemon.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-grab ${
        isDragging ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex-shrink-0 text-slate-400 hover:text-slate-300">
        <GripVertical />
      </div>

      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-10 h-10 object-contain flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-100 capitalize truncate mb-1">
          {pokemon.name}
        </div>
        <div className="flex gap-1 flex-wrap mb-1">
          {pokemon.types.slice(0, 2).map((type, index) => (
            <PokemonTypeBadge key={index} type={type} size="small" />
          ))}        </div>
        <div className="text-xs text-slate-400">
          Ataque: {pokemon.attack || "N/A"}
        </div>
      </div>
    </div>
  );
};

const TeamPokemonList = ({ pokemon, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = pokemon.findIndex((p) => p.id === active.id);
      const newIndex = pokemon.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(pokemon, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  const handleRandomSort = () => {
    const shuffled = [...pokemon].sort(() => Math.random() - 0.5);
    onReorder(shuffled);
  };

  const handleSortByAttack = () => {
    const sorted = [...pokemon].sort(
      (a, b) => (b.attack || 0) - (a.attack || 0)
    );
    onReorder(sorted);
  };

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-6 text-slate-400">
        <div className="text-2xl mb-2">👥</div>
        <p className="text-sm">Sin Pokémon</p>
        <p className="text-xs">Agrega Pokémon a tu equipo</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-slate-300">
          Pokémon: ({pokemon.length}/6)
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRandomSort}
            className="px-3 py-1 text-xs bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center gap-1"
            title="Orden aleatorio"
          >
            🎲 Aleatorio
          </button>
          <button
            onClick={handleSortByAttack}
            className="px-3 py-1 text-xs bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors flex items-center gap-1"
            title="Ordenar por ataque (mayor a menor)"
          >
            ⚔️ Por Ataque
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={pokemon.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">            {pokemon.map((poke) => (
              <SortablePokemonItem
                key={poke.id}
                pokemon={poke}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {pokemon.length < 6 && (
        <div className="text-xs text-slate-500 text-center mt-2">
          {6 - pokemon.length} slot(s) disponible(s)
        </div>
      )}
    </div>
  );
};

export default TeamPokemonList;
