import { useState, useEffect } from "react";
import EditForm from "../components/EditForm";
import { EditButterfly, getOneButterfly } from "../services/ButterflyServices";
import CountrySelect from "../components/CountrySelect";
import { useParams, useNavigate } from "react-router-dom";
import TitleSection from "../components/TitleSection";
import { successAlert, errorAlert } from "../components/Alerts";

const EditedButterfly = () => {
  const [FormData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simula cargar una mariposa específica por su ID
  // Esto es para la url, hace que que aparezca el id en el url
  const { id } = useParams();
  console.log("ID obtenido de la URL:", id);

  useEffect(() => {
    const fetchButterfly = async () => {
      try {
        const butterfly = await getOneButterfly(id);
        console.log("Mariposa obtenida:", butterfly);

        // Para evitar undefined, asignamos con spread y valores por defecto
        setFormData({
          name: butterfly.name || "",
          sciname: butterfly.sciname || "",
          shortDescription: butterfly.shortDescription || "",
          longDescription: butterfly.longDescription || "",
          status: butterfly.status || "",
          activity: butterfly.activity || "",
          region: butterfly.region || "",
          location: butterfly.location || "",
          imageUrl: butterfly.imageUrl || "",
          id: butterfly.id || id, // aseguramos id
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar mariposa:", err);
        setIsLoading(false); // para evitar loading infinito
      }
    };

    fetchButterfly();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSelectionChange = ({ region, location }) => {
    setFormData({ ...FormData, region, location });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await EditButterfly(FormData);
      successAlert({
        title: `¡Mariposa actualizada con éxito!`,
        message: `¡Mariposa actualizada con éxito!`,
      });
      //alert("¡Mariposa actualizada con éxito!");
      navigate(`/butterflydetails/${FormData.id}`);
    } catch (error) {
      errorAlert({
        title: "Error",
        message: "Error al actualizar mariposa."
      });
    }
  };

  if (isLoading || !FormData) return <p>Cargando datos...</p>;




  return (
    <>
      <TitleSection title="Editar Mariposa" />
      <div className="mx-8">
        <EditForm
          FormData={FormData}
          onChange={onChange}
          onSubmit={onSubmit}
          data={FormData}
          handleSelectionChange={handleSelectionChange}
        />
      </div>
    </>
  );
};

export default EditedButterfly;
