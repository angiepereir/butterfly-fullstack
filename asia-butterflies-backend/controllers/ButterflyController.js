import ButterflyModel from "../models/ButterflyModel.js";

export const getAllButterflies = async (req, res) => {
  try {
    const butterflies = await ButterflyModel.findAll();
    res.status(200).json(butterflies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//trae una mariposa
export const getOneButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    const butterfly = await ButterflyModel.findByPk(id);
    if (!butterfly) {
      return res.status(404).json({ error: "Mariposa no encontrada" });
    }
    res.status(200).json(butterfly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//crea una mariposa
export const createButterfly = async (req, res) => {
  try {
    const { 
      name, 
      sciname, 
      shortDescription, 
      longDescription, 
      activity, 
      status, 
      region, 
      location, 
      imageUrl 
    } = req.body;

    const newButterfly = await ButterflyModel.create({
      name,
      sciname,
      shortDescription,
      longDescription,
      activity,
      status,
      region,
      location,
      imageUrl,
    });

    res.status(201).json(newButterfly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la mariposa" });
  }
};

// Actualiza una mariposa por ID
// export const updateButterfly = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       sciname,
//       shortDescription,
//       longDescription,
//       activity,
//       status,
//       region,
//       location,
//       imageUrl,
//     } = req.body;

//     // Sequelize update
//     const [updated] = await ButterflyModel.update(
//       {
//         name,
//         sciname,
//         shortDescription,
//         longDescription,
//         activity,
//         status,
//         region,
//         location,
//         imageUrl,
//       },
//       { where: { id } }
//     );

//     // Devolver la mariposa ya actualizada
//     const updatedButterfly = await ButterflyModel.findByPk(id);
//     res.status(200).json(updatedButterfly);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }

// };
export const updateButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      sciname,
      shortDescription,
      longDescription,
      activity,
      status,
      region,
      location,
      imageUrl,
    } = req.body;

    const b = await ButterflyModel.findByPk(id);
    if (!b) return res.status(404).json({ error: "Mariposa no encontrada" });

    // Asigna SOLO si vienen definidos. Esto dispara los setters del modelo.
    if (name !== undefined) b.set("name", name);
    if (sciname !== undefined) b.set("sciname", sciname);
    if (shortDescription !== undefined) b.set("shortDescription", shortDescription);
    if (longDescription !== undefined) b.set("longDescription", longDescription);
    if (activity !== undefined) b.set("activity", activity); // setter -> parseInt o null
    if (status !== undefined) b.set("status", status);       // setter -> parseInt o null
    if (region !== undefined) b.set("region", region);
    if (location !== undefined) b.set("location", location);
    if (imageUrl !== undefined) b.set("imageUrl", imageUrl);

    await b.save(); // aquí persiste (y corre validaciones de instancia)

    // Importante: sin { raw:true } para que se apliquen los getters al devolver
    res.status(200).json(b);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// 🦋 Eliminar una mariposa por su ID
export const deleteButterfly = async (req, res) => {
  try {
    // Tomar el "id" de la URL
    const { id } = req.params;

    // Buscar la mariposa en la base de datos
    const butterfly = await ButterflyModel.findByPk(id);

    // Comprobar si no se encuentra la mariposa
    if (!butterfly) {
      // Enviar error 404 si no existe
      return res.status(404).json({ error: "Mariposa no encontrada" });
    }

    // Eliminar la mariposa de la base de datos
    await butterfly.destroy();

    // Enviar mensaje de éxito
    res.status(200).json({ message: "Mariposa eliminada correctamente" });
  } catch (error) {
    // Mostrar el error en consola
    console.error(error);

    // Enviar error 500 si falla la operación
    res.status(500).json({ error: "Error al eliminar la mariposa" });
  }
};
