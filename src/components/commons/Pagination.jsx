const Pagination = ({
  currentPage,
  onNextPage,
  onPrevPage,
  hasNext,
  isLoading = false,
  showPageNumber = true,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 0 || isLoading}
        className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      {showPageNumber && (
        <span className="text-slate-300">Página {currentPage + 1}</span>
      )}

      <button
        onClick={onNextPage}
        disabled={!hasNext || isLoading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
