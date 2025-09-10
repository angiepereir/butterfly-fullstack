import React, { useState, useEffect } from "react";
import ButterflyCard from "../components/butterflies/ButterflyCard";
import { getAllButterflies } from "../services/ButterflyServices";
import TitleSection from "../components/TitleSection";
import Buttons from "../components/Buttons";

const ButterflyGrid = () => {
  const [butterflies, setButterflies] = useState([]);  // siempre array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const butterflyData = await getAllButterflies();
        setButterflies(Array.isArray(butterflyData) ? butterflyData : []);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError("Error cargando las mariposas");
        setButterflies([]); // evita undefined
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Scroll to top cuando cambia de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Seguridad: si el total cambia y nos quedamos fuera de rango, corregimos la página
  const safeButterflies = Array.isArray(butterflies) ? butterflies : [];
  const totalPages = Math.max(1, Math.ceil(safeButterflies.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  // corte de página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentButterflies = safeButterflies.slice(indexOfFirstItem, indexOfLastItem);

  // estados de carga/error
  if (loading) return <div>Cargando mariposa... 🦋</div>;
  if (error) return <div>Error: {error} 🤦🏻‍♀️</div>;
  if (!safeButterflies.length) return <div>No hay mariposas 😢</div>;

  return (
    <section>
      <TitleSection title="Las mariposas en Asia" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {currentButterflies.map((butterfly) => (
          <ButterflyCard key={butterfly.id ?? `${butterfly.name}-${butterfly.location}`} butterfly={butterfly} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 my-8 px-4">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-3 px-6 rounded-lg font-segoe font-semibold border-2 outline shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
              currentPage === 1 ? "bg-gray-200 text-gray-300 cursor-not-allowed" : "bg-mint-green-600 text-white cursor-pointer"
            }`}
          >
            ← Anterior
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-segoe font-semibold cursor-pointer border-2 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
                  currentPage === i + 1 ? "bg-mint-green-600 text-white" : "bg-white text-mint-green-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-3 px-6 rounded-lg font-segoe font-semibold border-2 outline shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
              currentPage === totalPages ? "bg-gray-200 text-gray-300 cursor-not-allowed" : "bg-mint-green-600 text-white cursor-pointer"
            }`}
          >
            Siguiente →
          </button>
        </div>
      )}

      <div className="text-center text-gray-600 mb-4">
        Mostrando {safeButterflies.length ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, safeButterflies.length)} de {safeButterflies.length} mariposas
      </div>

      <div className="flex justify-center my-8">
        <Buttons styleType="primary" text="+ Crear nueva" className="mt-8 ml-6" linkTo={`/newbutterfly`} />
      </div>
    </section>
  );
};

export default ButterflyGrid;
