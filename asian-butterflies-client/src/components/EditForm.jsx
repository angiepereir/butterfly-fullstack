import CountrySelect from "./CountrySelect";
import ImageSelector from "./ImageSelector";
import StatusSelector from "./StatusSelector";
import Buttons from "./Buttons";


const EditForm = ({
  FormData,
  onChange,
  onSubmit,
  handleSelectionChange,
  isSubmitting = false,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Nombre */}
      <div className="flex flex-col">
        <label
          htmlFor="name-butterfly-input"
          className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe"
        >
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          maxLength="40"
          value={FormData.name}
          onChange={onChange}
          className="rounded-md w-full h-10 sm:h-12 bg-white px-3 border border-mint-green-200 focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 text-mint-green-700 mb-3"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Nombre científico */}
      <div className="flex flex-col">
        <label
          htmlFor="sci-name-butterfly-input"
          className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe"
        >
          Nombre científico:
        </label>
        <input
          type="text"
          name="sciname"
          maxLength="40"
          value={FormData.sciname}
          onChange={onChange}
          className="rounded-md w-full h-10 sm:h-12 bg-white px-3 border border-mint-green-200 focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 text-mint-green-700 mb-3"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* País */}
      <div>
        <label className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
          Selecciona la region de origen: <br />
          <CountrySelect onChange={handleSelectionChange}
            value={{ region: FormData.region, location: FormData.location }} />
        </label>
      </div>

      {/* Descripciones */}
      <div className="flex flex-col">
        <label
          htmlFor="description-butterfly-input"
          className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe"
        >
          Resumen:
        </label>
        <input
          type="text"
          name="shortDescription"
          maxLength="166"
          placeholder="Haz una breve descripción..."
          value={FormData.shortDescription}
          onChange={onChange}
          className="rounded-md w-full h-10 sm:h-24 bg-white px-3 border border-mint-green-200 focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 text-mint-green-700 mb-3"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="long-description-butterfly-input"
          className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe"
        >
          Descripción:
        </label>
        <textarea
          name="longDescription"
          maxLength="600"
          value={FormData.longDescription}
          onChange={onChange}
          className="rounded-md w-full h-10 sm:h-40 bg-white px-3 border border-mint-green-200 focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 text-mint-green-700 mb-3"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Estado */}
      <div>
        <label
          htmlFor="butterflies-status"
          className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe"
        >
          Estado de Conservación: <br />
          <StatusSelector
            value={FormData.status}
            onChange={onChange}
            disabled={isSubmitting}
          />
        </label>
      </div>


      {/* Actividad */}
      <div className="flex flex-col">
        <label className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
          Periodo de Actividad:
        </label>
        <label htmlFor="radio-diurno">
          <input
            type="radio"
            name="activity"
            value="1"
            checked={FormData.activity === "1"}
            onChange={onChange}
            className="mr-2 text-mint-green-700 text-sm lg:text-lg font-segoe"
            disabled={isSubmitting}
          />
          Diurna
        </label>
        <label htmlFor="radio-nocturno">
          <input
            type="radio"
            name="activity"
            value="0"
            checked={FormData.activity === "0"}
            onChange={onChange}
            className="mr-2 text-mint-green-700 mb-3 text-sm lg:text-lg font-segoe"
            disabled={isSubmitting}
          />
          Nocturna
        </label>
      </div>

      {/* Imagen */}
      <ImageSelector
        onUploadUrl={(url) =>
          onChange({ target: { name: "imageUrl", value: url } })
        }
      />
      {FormData.imageUrl && (
        <img
          src={FormData.imageUrl}
          alt="Vista previa"
          className="mt-4 w-48 h-auto rounded shadow-md border"
        />
      )}

      {/* Botón */}
      <div className="flex justify-center pt-6">
        <Buttons
          type="submit"
          styleType="primary"
          text={isSubmitting ? "Actualizando..." : "Guardar cambios"}
          className="mt-8 ml-6"
          disabled={isSubmitting}
        />
      </div>
    </form >
  );
};

export default EditForm;
