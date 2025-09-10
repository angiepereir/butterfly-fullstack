import { validationResult } from "express-validator";

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  // Formato de salida compacto
  return res.status(400).json({
    error: "Validación fallida",
    details: errors.array().map(e => ({
      field: e.type === "field" ? e.path : e.type, // path o tipo (params/body)
      msg: e.msg
    })),
  });
}
