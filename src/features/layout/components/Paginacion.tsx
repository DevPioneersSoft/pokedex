import React from 'react';

interface PaginacionProps {
  pagina: number;
  totalPaginas: number;
  handleAnterior: () => void;
  handleSiguiente: () => void;
}

const Paginacion: React.FC<PaginacionProps> = ({ pagina, totalPaginas, handleAnterior, handleSiguiente }) => (
  <div className="flex justify-center items-center gap-4 my-6">
    <button
      className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
      onClick={handleAnterior}
      disabled={pagina === 1}
    >
      Anterior
    </button>
    <span className="text-white">Página {pagina} de {totalPaginas}</span>
    <button
      className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
      onClick={handleSiguiente}
      disabled={pagina >= totalPaginas}
    >
      Siguiente
    </button>
  </div>
);

export default Paginacion;
