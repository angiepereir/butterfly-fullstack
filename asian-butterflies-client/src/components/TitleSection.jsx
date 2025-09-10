import React from "react";

const TitleSection = ( {title} ) => {
    return (
        <div className="w-full px-4 my-8">
            <h2 className="font-segoe text-mint-green-700 text-1xl sm:text-2xl md:text-3xl font-bold mb-4 px-4">{title}</h2>
         
         {/* esta etiqueta hr dibuja una linea horizontal */}

        <hr className="mb-2 border-t-2 border-mint-green-100"/>
        </div>
    );

};
export default TitleSection;