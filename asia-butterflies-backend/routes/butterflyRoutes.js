import express from "express";
import { handleValidation } from "../middlewares/handleValidation.js";
import {idParamValidator, createButterflyValidator, updateButterflyValidator} from "../middlewares/butterflyValidators.js";
import { getAllButterflies, getOneButterfly, updateButterfly, createButterfly, deleteButterfly} from "../controllers/butterflyController.js";

const butterflyRouter = express.Router();

butterflyRouter.get("/", getAllButterflies);
//Obtener una por id (valida :id primero)
butterflyRouter.get("/:id", idParamValidator, handleValidation, getOneButterfly);
// Crear (valida body primero)
butterflyRouter.post("/", createButterflyValidator, handleValidation, createButterfly);
// Borrar (valida :id primero)
butterflyRouter.delete("/:id", idParamValidator, handleValidation, deleteButterfly);
// Actualizar (valida :id y body primero)
butterflyRouter.put("/:id", updateButterflyValidator, handleValidation, updateButterfly);

export default butterflyRouter;
