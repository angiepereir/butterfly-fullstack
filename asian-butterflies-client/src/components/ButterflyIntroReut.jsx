import React from "react";

const ButterflyIntroReut = ({title, image, children}) => {
    return (
         <>
         
          <section>
            {title && (
              <header className="text-center mb-7 mt-8">
                <h1 className=" font-segoe text-mint-green-700 text-3xl sm:text-4xl xl:text-5xl font-bold mb-4 px-4">
                    {title}
                </h1>
              </header>
         )}

              <section className="flex flex-col 2xl:flex-row justify-center items-center xl:gap-32 p-4 md:p-8 ">
                <div className="flex justify-center items-center 2xl:order-1">
                  <img src={image} alt="Mariposa asiática" className="max-w-[200px] mb-6 md:max-w-[400px] lg:max-w-[500px] h-auto animate-flotar" />
                </div>
        
                <div className="w-full max-w-2xl 2xl:w-1/2 2xl:order-2">
                  <div className=" text-center md:text-left px-4 md:px-6 lg:px-10">
                    <p className="font-segoe text-mint-green-700 text-sm lg:text-lg leading-relaxed opacity-0 animate-fade-in animation-delay-500">
                      {children}
                    </p>
                  </div>
                </div>
              </section>
              </section>
            </>


    )


}
export default ButterflyIntroReut;
