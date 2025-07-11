export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-slate-300">Cargando...</p>
      </div>
    </div>
  );
};
