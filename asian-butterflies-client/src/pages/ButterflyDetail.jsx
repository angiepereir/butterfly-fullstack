import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getOneButterfly,
  deleteButterfly,
} from "../services/ButterflyServices";
import TitleSection from "../components/TitleSection";
import Buttons from "../components/Buttons";
import { confirmAlert, successAlert, errorAlert } from "../components/Alerts";

// useState - Estados del componente
const ButterflyDetail = () => {
  const { id } = useParams(); // Obtener el ID de los parámetros de la URL
  const navigate = useNavigate(); // Hook para navegar programáticamente
  const [butterfly, setButterfly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  //Variables de Actividad y Estado a texto
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

  // Función para ELIMINAR
  const handleDelete = async () => {
    const result = await confirmAlert({
      title: "Confirmar eliminación",
      message: `¿Estás segura de que quieres eliminar la mariposa "${butterfly.name}"? Esta acción no se puede deshacer.`,
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar"
    });

    if (!result) {
      return; // Si el usuario cancela no se hace nada
    }

    try {
      setDeleting(true); // Activa estado de eliminación
      await deleteButterfly(id); // llama al servicio de eliminación - metodo delete en services
      
      // Usar successAlert en lugar de alert nativo
      await successAlert({
        title: "¡Eliminada!",
        message: `La mariposa "${butterfly.name}" ha sido eliminada correctamente.`
      });
      
      navigate("/butterflygrid");
    } catch (error) {
      // Usar errorAlert en lugar de alert nativo
      errorAlert({
        title: "Error al eliminar",
        message: "Hubo un error al eliminar la mariposa. Por favor inténtalo de nuevo."
      });
    } finally {
      setDeleting(false); // Desactiva el estado de eliminación
    }
  };

  // useEffect - Efecto para cargar los datos cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const butterflyData = await getOneButterfly(id);
        setButterfly(butterflyData);
        setError(null);
      } catch (error) {
        setError(`Error cargando la mariposa: ${error.message}`);
        // Opcional: También puedes mostrar una alerta de error aquí
        errorAlert({
          title: "Error de carga",
          message: `No se pudo cargar la información de la mariposa: ${error.message}`
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Se ejecuta cuando cambia el ID

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []); // Se ejecuta al montar el componente

  //gestionar los estados de carga y error
  if (loading) {
    return <div>Cargando ficha de Mariposa... 🦋</div>;
  }
  if (error) {
    return <div>{error} 🤦🏻‍♀️ </div>;
  }
  if (!butterfly) {
    return <div>Mariposa no encontrada 😢</div>;
  }

  return (
    <>
      <section className="mx-8">
        <TitleSection title={`Ficha de ${butterfly.name}`} />
        <div className="relative mb-6 flex justify-center">
          <img
            src={butterfly.imageUrl}
            alt={butterfly.imageAlt}
            className="max-w-xs sm:max-w-md lg:max-w-xl w-full h-auto rounded-[20px]"
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <p className="text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
            <span className="font-bold">Nombre Científico:</span>{" "}
            <span className="italic">{butterfly.sciname}</span>
          </p>
          <p className="text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
            <span className="font-bold">Periodo de Actividad:</span>{" "}
            <span>{getActivityText(butterfly.activity)}</span>
          </p>
          <p className="text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
            <span className="font-bold">Estado de Conservación:</span>{" "}
            <span>{getStatusText(butterfly.status)}</span>
          </p>
          <p className="text-mint-green-700 mb-4 text-sm lg:text-lg font-segoe">
            <span className="font-bold">Localización:</span>{" "}
            <span>{butterfly.location}</span>
          </p>
          <p className="text-mint-green-700 mb-1 text-sm lg:text-lg font-segoe">
            {butterfly.longDescription}
          </p>
        </div>
        <div className="flex justify-center my-8">
          <Buttons
            styleType="primary"
            text="Editar Ficha"
            className="mt-8 ml-6"
            linkTo={`/editbutterfly/${butterfly.id}`}/>
          <Buttons
            styleType="secondary"
            text={deleting ? "Eliminando..." : "Eliminar"}
            className="mt-8 ml-6"
            onClick={handleDelete} // Pasar la función como prop
            disabled={deleting} // Deshabilitar mientras se elimina
          />
        </div>
      </section>
    </>
  );
};

export default ButterflyDetail;
