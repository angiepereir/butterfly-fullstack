import CountrySelect from "./CountrySelect";
import ImageSelector from "./ImageSelector";
import StatusSelector from "./StatusSelector";
import Buttons from "./Buttons";

const CreateForm = ({
  FormData,
  onChange,
  onSubmit,
  data,
  handleSelectionChange,
  isSubmitting = false, // Nuevo prop para manejar el estado de envío
}) => {
  return (
    <>
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
            placeholder="Mariposa del Merge Infinito en Develop..."
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
            placeholder="Morpho conflictus developensis.."
            className="rounded-md w-full h-10 sm:h-12 bg-white px-3 border border-mint-green-200 focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 text-mint-green-700 mb-3"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Selección de país */}
        <div>
          <label className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
            Selecciona el país de origen: <br />
            <CountrySelect
              datos={data}
              onChange={handleSelectionChange}
              disabled={isSubmitting}
            />
          </label>
        </div>

        {/* Descripción corta */}
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

        {/* Descripción larga */}
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
            placeholder="Describe la mariposa con pelos, alas y señales..."
            value={FormData.longDescription}
            onChange={onChange}
            className="rounded-md w-full h-10 sm:h-40 bg-white px-3 border border-mint-green-200 focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 text-mint-green-700 mb-3"
            required
            disabled={isSubmitting}
          />
        </div>

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

        {/* Actividad (radio buttons) */}
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

        {/* Subir imagen */}
        <ImageSelector
          onUploadUrl={(url) =>
            onChange({ target: { name: "imageUrl", value: url } })
          }
          disabled={isSubmitting}
        />

        {/* Vista previa */}
        {FormData.imageUrl && (
          <img
            src={FormData.imageUrl}
            alt="Vista previa"
            className="mt-4 w-48 h-auto rounded shadow-md border"
          />
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 my-8">
          <Buttons
            type="submit"
            styleType="primary"
            text={isSubmitting ? "Creando..." : "Agregar"}
            className="mt-8 ml-6"
            disabled={isSubmitting}
          />
          <Buttons
            styleType="secondary"
            text="Cancelar"
            linkTo="/butterflygrid"
            className="mt-8 ml-6"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};

export default CreateForm
