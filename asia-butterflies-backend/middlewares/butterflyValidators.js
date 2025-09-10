import { checkSchema, param } from "express-validator";

// Validación para :id en params
export const idParamValidator = [
  param("id")
    .exists().withMessage("El id es requerido")
    .bail()
    .toInt()
    .isInt({ gt: 0 }).withMessage("id debe ser un entero positivo"),
];

// Validación para crear
export const createButterflyValidator = checkSchema({
  name: {
    in: ["body"],
    exists: { errorMessage: "name es obligatorio" },
    trim: true,
    isString: { errorMessage: "name debe ser string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "name debe tener entre 1 y 255 caracteres",
    },
  },
  sciname: {
    in: ["body"],
    optional: true,
    trim: true,
    isString: { errorMessage: "sciname debe ser string" },
    isLength: {
      options: { max: 255 },
      errorMessage: "sciname no puede superar 255 caracteres",
    },
  },
  shortDescription: {
    in: ["body"],
    optional: true,
    trim: true,
    isString: { errorMessage: "shortDescription debe ser string" },
    isLength: {
      options: { max: 1000 },
      errorMessage: "shortDescription no puede superar 1000 caracteres",
    },
  },
  longDescription: {
    in: ["body"],
    exists: { errorMessage: "longDescription es obligatoria" },
    trim: true,
    isString: { errorMessage: "longDescription debe ser string" },
  },
  activity: {
    in: ["body"],
    optional: true,
    toInt: true,
    isInt: {
      options: { min: 0, max: 255 },
      errorMessage: "activity debe ser un entero entre 0 y 255",
    },
  },
  status: {
    in: ["body"],
    optional: true,
    toInt: true,
    isInt: {
      options: { min: 0, max: 255 },
      errorMessage: "status debe ser un entero entre 0 y 255",
    },
  },
  region: {
    in: ["body"],
    optional: true,
    trim: true,
    isString: { errorMessage: "region debe ser string" },
    isLength: {
      options: { max: 255 },
      errorMessage: "region no puede superar 255 caracteres",
    },
  },
  location: {
    in: ["body"],
    optional: true,
    trim: true,
    isString: { errorMessage: "location debe ser string" },
    isLength: {
      options: { max: 255 },
      errorMessage: "location no puede superar 255 caracteres",
    },
  },
  imageUrl: {
    in: ["body"],
    optional: true,
    trim: true,
    isURL: { errorMessage: "imageUrl debe ser una URL válida" },
    isLength: {
      options: { max: 2048 },
      errorMessage: "imageUrl no puede superar 2048 caracteres",
    },
  },
});

// Validación para actualizar (todos opcionales, pero con tipos correctos)
export const updateButterflyValidator = [
  ...idParamValidator,
  ...checkSchema({
    name: {
      in: ["body"], optional: true, trim: true,
      isString: { errorMessage: "name debe ser string" },
      isLength: { options: { min: 1, max: 255 }, errorMessage: "name debe tener entre 1 y 255 caracteres" },
    },
    sciname: {
      in: ["body"], optional: true, trim: true,
      isString: { errorMessage: "sciname debe ser string" },
      isLength: { options: { max: 255 }, errorMessage: "sciname no puede superar 255 caracteres" },
    },
    shortDescription: {
      in: ["body"], optional: true, trim: true,
      isString: { errorMessage: "shortDescription debe ser string" },
      isLength: { options: { max: 1000 }, errorMessage: "shortDescription no puede superar 1000 caracteres" },
    },
    longDescription: {
      in: ["body"], optional: true, trim: true,
      isString: { errorMessage: "longDescription debe ser string" },
    },
    activity: {
      in: ["body"], optional: true, toInt: true,
      isInt: { options: { min: 0, max: 255 }, errorMessage: "activity debe ser un entero entre 0 y 255" },
    },
    status: {
      in: ["body"], optional: true, toInt: true,
      isInt: { options: { min: 0, max: 255 }, errorMessage: "status debe ser un entero entre 0 y 255" },
    },
    region: {
      in: ["body"], optional: true, trim: true,
      isString: { errorMessage: "region debe ser string" },
      isLength: { options: { max: 255 }, errorMessage: "region no puede superar 255 caracteres" },
    },
    location: {
      in: ["body"], optional: true, trim: true,
      isString: { errorMessage: "location debe ser string" },
      isLength: { options: { max: 255 }, errorMessage: "location no puede superar 255 caracteres" },
    },
    imageUrl: {
      in: ["body"], optional: true, trim: true,
      isURL: { errorMessage: "imageUrl debe ser una URL válida" },
      isLength: { options: { max: 2048 }, errorMessage: "imageUrl no puede superar 2048 caracteres" },
    },
  }),
];
