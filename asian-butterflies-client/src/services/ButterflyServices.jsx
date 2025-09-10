import axios from "axios";
const URL_API = "http://localhost:8000/butterflies/";

export const getAllButterflies = async () => {
    try {
        const response = await axios.get(URL_API);
        return response.data;
    } catch (error) {
        console.log(`Error al sacar las mariposas en ButterflyServices: ${error}.`);
    }

};

export const getOneButterfly = async (id) => {
    try {
        const response = await axios.get(URL_API + id);
        return response.data;
    } catch (error) {
        console.log(`Error al sacar una mariposa en ButterflyServices: ${error}.`);
    }
}

// Metodo POST para el create

export const createNewButterfly = async(data) =>{
console.log("hola")
    const response = await axios.post(URL_API, data) ;
        return response.data; // para uqe devueleva algun dato

       
    }
// Metodo PUT para actualizar

export const EditButterfly = async (data) => {
  
  try {
  
    console.log("Intentando actualizar mariposa:", data);
    const response = await axios.put(`${URL_API}${data.id}`, data);

    return response.data;
  } catch (error) {
    // Si ocurre un error en la petición, lo mostramos por consola
    console.error("Error al actualizar la mariposa:", error);

    // Re-lanzamos el error para que quien use esta función lo pueda manejar
    throw error; // Es como cuando hay un error grande lo detecta inmediatamente 
  }
};

// Metodo DELETE para eliminar

export const deleteButterfly = async (id) => {
    try {
        const response = await axios.delete(URL_API + id);
        return response.data;
    } catch (error) {
        console.log(`Error al borrar una mariposa en ButterflyServices: ${error}.`);
    }
}
