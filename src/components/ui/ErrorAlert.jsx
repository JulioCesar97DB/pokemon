export const ErrorAlert = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">
            Error al cargar
          </h2>
          <p className="text-slate-300 mb-4">Hubo un problema</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
};
