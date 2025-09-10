import { useState } from 'react';
import TitleSection from "../components/TitleSection";
import Buttons from '../components/Buttons';
import { successAlert, errorAlert } from '../components/Alerts';
const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    comentario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);

      if (
    !formData.nombre.trim() ||
    !formData.correo.trim() ||
    !formData.comentario.trim()
  ) {
   
    errorAlert({
           title: `¡Necesitas rellenar el formulario!`,
           message: `Por favor, coloca los datos requeridos`,
         });
    return;
  }
    // Aquí iría la lógica para enviar el formulario
         successAlert({
           title: `¡Mensaje enviado con éxito!`,
           message: `¡Gracias por su comentario!`,
         });
    setFormData({
      nombre: '',
      correo: '',
      comentario: ''
    });
  };

  return (
     <>
      {/* Header */}
      <TitleSection title="Contáctanos:" />

      {/* Contenedor principal centrado */}
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>

      <div className="flex justify-center px-4 pb-16">
        <div className="w-400 bg-white rounded-lg  text-[20px] border-gray-200">
          
        

          {/* Formulario */}
          <div className="p-6 space-y-6">
            
            {/* Campo Nombre */}
            <div className="flex flex-col">
              <label 
                htmlFor="nombre-input"
                className="text-[#28422B] mb-2 font-medium"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="nombre-input"
                name="nombre"
                maxLength="50"
                placeholder="Tu nombre completo..."
                value={formData.nombre}
                onChange={handleChange}
                className="rounded-md w-full h-10 sm:h-12 bg-white px-3 border border-gray-300 focus:border-[#28422B] focus:outline-none"
                required
              />
            </div>

            {/* Campo Correo */}
            <div className="flex flex-col">
              <label 
                htmlFor="correo-input"
                className="text-[#28422B] mb-2 font-medium"
              >
                Correo electrónico:
              </label>
              <input
                type="email"
                id="correo-input"
                name="correo"
                maxLength="100"
                placeholder="tu@ejemplo.com..."
                value={formData.correo}
                onChange={handleChange}
                className="rounded-md w-full h-10 sm:h-12 bg-white px-3 border border-gray-300 focus:border-[#3D5B43] focus:outline-none"
                required
              />
            </div>

            {/* Campo Comentario */}
            <div className="flex flex-col">
              <label 
                htmlFor="comentario-input"
                className="text-[#3D5B43] mb-2 font-medium"
              >
                Comentario o mensaje:
              </label>
              <textarea
                id="comentario-input"
                name="comentario"
                maxLength="500"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.comentario}
                onChange={handleChange}
                className="rounded-md h-32 sm:h-40 w-full bg-white px-3 py-2 border border-gray-300 focus:border-[#3D5B43] focus:outline-none resize-none"
                required
              />
            </div>

            {/* Botón Enviar */}
             <div className="flex justify-center">
              <Buttons
                styleType="primary"
                text={"Enviar"}
                onClick={handleSubmit}
                type="submit"
              />
              </div>
            {/* Nota informativa */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Todos los campos son requeridos
              </p>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default Contact;