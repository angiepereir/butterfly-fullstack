import { useState } from "react";
import axios from "axios";

const ImageSelector = ({ onUploadUrl }) => {
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_app_upload"); // Asegúrate de que este preset exista en tu cuenta Cloudinary

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvykzqjt6/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      console.log("Imagen subida correctamente. URL:", imageUrl);
      onUploadUrl(imageUrl);
    } catch (error) {
      console.error("Error al subir imagen a Cloudinary:", error);
      setUploadError("Error al subir la imagen. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-mint-green-700 text-sm lg:text-lg font-segoe">
        Selecciona una imagen:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-mint-green-600  file:text-white
             hover:file:brightness-90 file:outline-mint-green-600  
             cursor-pointer"
      />

      {loading && (
        <p className="text-sm text-blue-600 animate-pulse">
           Subiendo imagen...
        </p>
      )}

      {uploadError && <p className="text-sm text-red-600"> {uploadError}</p>}
    </div>
  );
};

export default ImageSelector;
