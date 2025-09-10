
import { useEffect, useState } from "react";
import { div } from "three/src/nodes/TSL.js";

const CountrySelect = ({ onChange, value }) => {
  const [regionSeleccionada, setRegionSeleccionada] = useState();
  const [paisSeleccionado, setPaisSeleccionado] = useState();
  const regionData = {
    "Asia del Norte": [
      "China",
      "Mongolia",
      "Corea del Norte",
      "Corea del Sur",
      "Japón",
    ],
    "Asia del Sur": [
      "India",
      "Pakistán",
      "Bangladesh",
      "Sri Lanka",
      "Nepal",
      "Bután",
      "Maldivas",
      "Afganistán",
    ],
    "Asia Occidental": [
      "Turquía",
      "Irán",
      "Irak",
      "Siria",
      "Líbano",
      "Israel",
      "Jordania",
      "Arabia Saudí",
      "Emiratos Árabes Unidos",
      "Kuwait",
      "Qatar",
      "Bahréin",
      "Omán",
      "Yemen",
    ],
    "Asia Oriental": [ // Esto es una key
      "China",
      "Japón",
      "Corea del Sur",
      "Corea del Norte",
      "Mongolia",
      "Taiwán",
    ],
    "Sudeste Asiático": [
      "Birmania",
      "Brunéi",
      "Camboya",
      "Filipinas",
      "Indonesia",
      "Laos",
      "Malasia",
      "Singapur",
      "Tailandia",
      "Timor Oriental",
      "Vietnam",
      "Myanmar"
    ]
  }; // Final de los objetos

  const regiones = Object.keys(regionData); // seleccionando las keys ej. Asia Oriental
  function cambiarRegion(evento) {
    setRegionSeleccionada(evento.target.value);
    setPaisSeleccionado(""); // Limpiar pais cuando cambia de region


    const nuevaRegion = evento.target.value;
    setRegionSeleccionada(nuevaRegion);
    setPaisSeleccionado("");
    onChange({ region: nuevaRegion, location: "" }); // Usamos nuevaRegion 

  }

  function cambiarPais(evento) {
    const location = evento.target.value;
    setPaisSeleccionado(location);
    onChange({ region: regionSeleccionada, location }); // Llama a CreateButterfly
  }
  useEffect(() => {
    if (value) {
      setRegionSeleccionada(value.region);
      setPaisSeleccionado(value.location);
    }
  }, [value]);

  return (
    <>
      <select
        name="region"
        id="region"
        value={regionSeleccionada}
        onChange={cambiarRegion}
        className="rounded-md border border-mint-green-200 h-10 w-60 mt-2 text-mint-green-700 text-base font-normal focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 px-3 py-2 mb-4"
      >
        <option value="">-- Selecciona una región --</option>
        {regiones.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <br />

      {/* Aqui se esta recorriendo el valor de lo que esta dentro del regionData*/}
      {regionSeleccionada && (
        <div>
          <label className="font-bold text-mint-green-700 mb-2 text-sm lg:text-lg font-segoe">
            Selecciona el país de origen:
          </label><br />
          <select
            value={paisSeleccionado}
            onChange={cambiarPais}
            className="rounded-md border border-mint-green-200 h-10 w-60 mb-3 text-mint-green-700 text-base font-normal focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 px-3 py-2 mt-2">
            <option value="">-- Elige un país --</option>
            {regionData[regionSeleccionada].map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

      )}
    </>
  );
};

export default CountrySelect;