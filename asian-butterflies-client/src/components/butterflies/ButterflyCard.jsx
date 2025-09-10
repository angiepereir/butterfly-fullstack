import React from "react";
import Buttons from "../Buttons";
// Importar todas las imágenes de los iconos
import iconNoche from "../../assets/img/icon-noche-o.png";
import iconDia from "../../assets/img/icon-dia-o.png";
import iconEstable from "../../assets/img/icon-estable-o.png";
import iconVulnerable from "../../assets/img/icon-vulnerable-o.png";
import iconCritico from "../../assets/img/icon-critico-o.png";

function ButterflyCard({ butterfly }) {
  //Funciones helper para Tooltip
  const getActivityText = (activity) => {
    return activity === "0" ? "Nocturna" : "Diurna";
  };

  const getStatusText = (status) => {
    switch (status) {
      case "0":
        return "Estable";
      case "1":
        return "Vulnerable";
      case "2":
        return "Crítico";
      default:
        return "Estable";
    }
  };
  // Función para obtener el icono de actividad
  const getActivityIcon = (activity) => {
    console.log("Actividad recibida:", activity);
    return activity === "0" ? iconNoche : iconDia;
  };
  // Función para obtener el icono de status
  const getStatusIcon = (status) => {
    switch (status) {
      case "0":
        return iconEstable;
      case "1":
        return iconVulnerable;
      case "2":
        return iconCritico;
      default:
        return iconEstable; // fallback
    }
  };

  return (
    <div className="bg-light-green-0 rounded-3xl p-4 sm:p-6 max-w-sm mx-auto shadow-lg shadow-light-green-600/30 flex flex-col h-full">
      {/* Imagen de la mariposa */}
      <div className="relative mb-6">
        <img
          src={butterfly.imageUrl}
          alt={butterfly.imageAlt}
          className="w-full rounded-[20px]"
        />
      </div>
      <h2
        className="font-bold text-lg sm:text-xl text-mint-green-700 font-segoe"
      >
        {butterfly.name}
      </h2>
      <h2
        className="italic text-lg sm:text-xl text-mint-green-700 mb-4 font-segoe"
      >
        {butterfly.sciname}
      </h2>
      <p
        className="text-mint-green-700 mb-8 text-sm sm:text-base font-segoe"
      >
        {butterfly.shortDescription}
      </p>
      {/* Actividad y Status con ícono */}
      <div className="pb-3 flex gap-3">
        <div className="relative group">
          <img
            src={getActivityIcon(butterfly.activity)}
            alt="Activity icon"
            className="w-12 h-12 cursor-help"
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-lime-green text-mint-green-700 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {getActivityText(butterfly.activity)}
          </div>
        </div>

        <div className="relative group">
          <img
            src={getStatusIcon(butterfly.status)}
            alt="Status icon"
            className="w-12 h-12 cursor-help"
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-mustard-yellow text-mint-green-700 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {getStatusText(butterfly.status)}
          </div>
        </div>
      </div>
      <h3
        className="pb-4 sm:pb-3 text-base sm:text-lg text-mint-green-700 mb-4 font-segoe"
      >
        📍 {butterfly.location}
      </h3>
      <div className="flex justify-center my-8 mx-auto mt-auto">
        <Buttons
          styleType="tertiary"
          text="Leer más"
          linkTo={`/butterflydetails/${butterfly.id}`}
        />
      </div>
    </div>
  );
}

export default ButterflyCard;
