import { TriangleAlert, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-8">
        <TriangleAlert className="h-32 w-32 text-red-500" />

        <h1 className="text-6xl font-bold text-red-500">404</h1>

        <h2 className="text-3xl font-bold text-gray-800">¡Pokémon No Encontrado!</h2>

        <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
          Parece que este Pokémon se ha escapado a otra región...
          <br />
          <span className="text-sm text-gray-500 mt-2 block">
            La página que buscas no existe o ha sido movida.
          </span>
        </p>

        <button 
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Volver al Centro Pokémon
        </button>
      </div>
    </div>
  );
};
