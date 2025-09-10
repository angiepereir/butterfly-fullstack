
import {  MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

//MANERA SENCILLA DE IMCORPORAR EL MAPA DESDE LA PAGINA PERO NO NOS DEJABA IMPORTAR SU PAGINA
// function MapaINaturalist() {
//     return (
//         <div className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-lg"> 
//             <iframe 
//             src="https://www.inaturalist.org/projects/butterflies-of-southeast-asian-forests" 
//              width={"100%"}
//              height={"100%"}
//              style={{border : "none"}}
//              loading="lazy" /*Hace que cargue solo cuando lo necesitas*/
//              allowFullScreen  /*Permite hacer zoom o pantalla completa si lo quieres*/

//             ></iframe>

//         </div>

//     );
// }
// export default MapaINaturalist;

function MapaINaturalist () {
  //observations: almacena las observaciones de mariposas que vienen del API.
  //setObservations: función para actualizar ese estado.
   const [observations, setObservations] = useState([]);//Inicialmente está vacío ([]), porque aún no hemos hecho la petición.
    const [loading, setLoading] = useState(true);
   useEffect(() => {
    // Usamos la API de iNaturalist con el taxon_id=47157 (mariposas) y place_id=97394 (Asia)
 const fetchObservations = async () => {
    try {
    //// Petición a la página 1
        const response1= await fetch ('https://api.inaturalist.org/v1/observations?taxon_id=47157&has[]=geo&per_page=200&page=3&swlat=6&swlng=68&nelat=36&nelng=92')
         if (!response1.ok) {
      throw new Error("Error en la respuesta de la API");
    }
        const data1 = await response1.json ();
        console.log("Datos recibidos:", data1); // DEBUG
        // peticion pagina 2
         const response2= await fetch ('https://api.inaturalist.org/v1/observations?taxon_id=47157&has[]=geo&per_page=200&page=2&swlat=0&swlng=90&nelat=36&nelng=146')
         if (!response2.ok) {
      throw new Error("Error en la respuesta de la API");
    }
        const data2 = await response2.json ();
        console.log("Datos recibidos:", data2); // DEBUG
        // hacemos constante para las dos paginas
        const allData = [...data1.results, ...data2.results]; // ... es un array concadenado ....
        setObservations (allData);
        setLoading (false);// cuando ya tenemos los datos

    } catch  (error) {
        console.error("Error al cargar las observaciones:", error);
      setLoading(false); // ✅ aunque falle, quitamos el "cargando"
    }
     

    };  
    
    fetchObservations  ();

 }, [])

// Mienttras se cargan los datos AQUI METEMEOS EL COMPOENTE LOADER DE LA MARIPOSA QUITAMOS EL TEXTO METEMOS COMPONENTE
if (loading) {
    return (
        <div className="flex justify-center items-center h-[600px]">
        {/* <p className="text-lg font-semibold animate-pulse text-purple-600">
          Cargando observaciones de mariposas...
        </p> */}
        <Loader/>
      </div>
    );
}
// si ya se cargaron mostramos el mapa
  return (
    <div className='flex justify-center items-center mb-10 h-[600px] w-[80%] max-w-5xl mx-auto 
  border-2 border-green-700 shadow-xl rounded-2xl 
  hover:shadow-[0_0_30px_6px_rgba(0,0,0,0.6)] transition-shadow duration-300'>
   <MapContainer center={[25, 100]} minZoom={2} zoom={4} maxZoom={8} className='h-full w-full rounded-lg shadow-lg'>
     {/* <TileLayer
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
     />  */}
       <>
    <TileLayer
      url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
      attribution='Tiles &copy; <a href="https://www.esri.com/en-us/home">Esri</a> &mdash; Sources: GEBCO, NOAA, National Geographic, DeLorme, and Esri'
    />
    <TileLayer
      url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}"
      attribution='Labels &copy; Esri'
    />
  </>

        {/* Recorremos el array de observaciones con .map() para crear un marcador (CircleMarker) para cada mariposa. */}
      {observations.map(obs => (  
        <CircleMarker
          key={obs.id}
           center={[obs.geojson.coordinates[1], obs.geojson.coordinates[0]]}
           radius={6}
         pathOptions={{ color: 'purple', fillColor: 'orange', fillOpacity: 0.6 }}
        >
          <Popup>
            <strong>{obs.taxon?.preferred_common_name || "Butterfly"}</strong><br />
            <em>{obs.taxon?.name}</em><br />
          <a href={obs.uri} target="_blank" rel="noreferrer">Ver en iNaturalist</a>
        </Popup>
       </CircleMarker>
      ))}
     </MapContainer>
 </div>
  );
 }
 export default MapaINaturalist;

