
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import { createNewButterfly } from "../services/ButterflyServices";
import TitleSection from "../components/TitleSection";
import { confirmAlert, successAlert, errorAlert } from "../components/Alerts";
import { getAllButterflies } from "../services/ButterflyServices";


const CreateButterfly = () => {
  const navigate = useNavigate();

  const [newButterfly, setNewButterfly] = useState({
    name: "",
    sciname: "",
    shortDescription: "",
    longDescription: "",
    activity: "",
    status: "",
    region: "",
    location: "",
    imageUrl: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Cargar datos de países al montar el componente
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const countryData = await getAllButterflies();
        setData(countryData);
        console.log("Datos cargados:", countryData);
      } catch (error) {
        console.error("Error al cargar:", error);
        errorAlert({
          title: "Error de carga",
          message: "No se pudieron cargar los datos de países. Por favor, recarga la página e intenta de nuevo."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  // Scroll al inicio al montar el componente
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Manejar cambios en los inputs
  const controlarInput = (e) => {
    const { name, value } = e.target;
    setNewButterfly({
      ...newButterfly,
      [name]: value,
    });
  };

  // Manejar cambios en el dropdown de países
  const handleSelectionChange = ({ region, location }) => {
    setNewButterfly({
      ...newButterfly,
      region: region,
      location: location,
    });
    console.log("Región y ubicación actualizadas:", { region, location });
  };

  // Validar que todos los campos estén completos
  const validateForm = () => {
    const requiredFields = [
      'name', 'sciname', 'shortDescription', 'longDescription',
      'activity', 'status', 'region', 'location', 'imageUrl'
    ];

    for (const field of requiredFields) {
      if (!newButterfly[field] || newButterfly[field].trim() === '') {
        return false;
      }
    }
    return true;
  };

  // Resetear formulario
  const resetForm = () => {
    setNewButterfly({
      name: "",
      sciname: "",
      shortDescription: "",
      longDescription: "",
      activity: "",
      status: "",
      region: "",
      location: "",
      imageUrl: "",
    });
  };

  // Manejar envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      errorAlert({
        title: "Formulario incompleto",
        message: "Por favor, completa todos los campos antes de continuar."
      });
      return;
    }

    // Confirmar antes de crear
    const shouldCreate = await confirmAlert({
      title: "Crear nueva mariposa",
      message: `¿Estás segura de que quieres crear la mariposa "${newButterfly.name}"?`,
      confirmText: "Sí, crear",
      cancelText: "Cancelar"
    });

    if (!shouldCreate) {
      return; // Si cancela, no hacer nada
    }

    try {
      setSubmitting(true);
      await createNewButterfly(newButterfly);

      // Mostrar alerta de éxito
      await successAlert({
        title: "¡Mariposa creada!",
        message: `La mariposa "${newButterfly.name}" ha sido añadida exitosamente a la colección.`
      });

      // Resetear formulario y navegar
      resetForm();
      navigate("/butterflygrid");

    } catch (error) {
      console.error("Error al crear mariposa:", error);
      errorAlert({
        title: "Error al crear",
        message: "Ocurrió un error al crear la mariposa. Por favor, verifica los datos e intenta de nuevo."
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Mostrar loading mientras cargan los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-mint-green-700 text-lg font-segoe">
          Cargando datos...
        </div>
      </div>
    );
  }

  return (
    <>
      <section>
        <TitleSection title="¡Añade una nueva especie!" />
        <div className="mx-8">
          <CreateForm
            FormData={newButterfly}
            onChange={controlarInput}
            onSubmit={manejarEnvio}
            data={data}
            handleSelectionChange={handleSelectionChange}
            isSubmitting={submitting}
          />
        </div>
      </section>
    </>
  );
};

export default CreateButterfly;