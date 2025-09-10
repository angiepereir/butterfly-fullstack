import React from "react";
import "../index.css" // aqui ya se importa tailwind
import ButterflyIntroReut from "../components/ButterflyIntroReut";
import introbutterflyg from "../assets/img/intro-butterfly-g.png";
import TitleSection from "../components/TitleSection";
import MapaINaturalist from "../components/MapaINaturalist";
  
const Home = () => {
  return (

    <>

      <ButterflyIntroReut
        title={
          <>
            Descubre las {" "} <strong className="bg-gradient-to-r from-[#9cc7ab] via-[#abbf60]
         to-[#957112] bg-clip-text text-transparent drop-shadow-md"> Mariposas</strong> Asiáticas
          </>
        }
        image={introbutterflyg}
      >
        Las mariposas desempeñan un{" "}
        <strong className="text-lime-green">papel fundamental como polinizadores.</strong>
        <br />
        <br />
        Al buscar néctar para alimentarse, sus grandes alas les ayudan a transferir
        el polen entre plantas lejanas, lo que las convierte en polinizadores activos
        de las flores silvestres.
        <br />
        <br />
        
        Asia es un continente con una extraordinaria riqueza en <strong className="text-lime-green">diversidad de mariposas diurnas
        </strong>, donde se pueden encontrar más de 500 especies, muchas de ellas destacadas
        por sus vibrantes colores y gráciles formas.
        <br />
        <br />
        Estas mariposas habitan una amplia gama de entornos, desde bosques tropicales
        hasta áreas templadas, y son esenciales para el equilibrio de los ecosistemas
        y la producción de alimentos.
        <br />
        <br />
        El mantenimiento de una amplia variedad de mariposas y otros polinizadores
        es <strong className="text-lime-green">esencial para la salud ambiental y la producción de alimentos.
        </strong>
       

      </ButterflyIntroReut>


       <TitleSection title="Mapa de observaciones" />
       <MapaINaturalist/>   
      



    </>


  )
}

export default Home