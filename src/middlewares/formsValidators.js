// https://github.com/validatorjs/validator.js

const { check, validationResult, body } = require("express-validator");

exports.validateNewBook = [
  check("title").notEmpty().withMessage("El título debe estar completo"),
  check("isbn")
    .notEmpty()
    .withMessage("El ISBN debe estar completo")
    .isNumeric()
    .withMessage("El ISBN solo puede contener números")
    .isLength({ min: 10, max: 13 })
    .withMessage("El ISBN debe tener entre 10 y 13 digitos"),
  check("price")
    .notEmpty()
    .withMessage("El precio debe estar completo")
    .isNumeric()
    .withMessage("El precio debe contener solamente números"),
  check("sinopsis").notEmpty().withMessage("La sinopsis debe estar completa"),
  check("amount").notEmpty().withMessage("La cantidad debe estar completa."),
  check("autor_id").notEmpty().withMessage("Seleccione un auto válido"),
  check("house_id").notEmpty().withMessage("Seleccion una editorial válida"),
  check("genre_id").notEmpty().withMessage("Seleccione un género válido"),
];

exports.validateNewUser = [
  check("first_name").notEmpty().withMessage("El nombre debe estar completo"),
  check("last_name").notEmpty().withMessage("El apellido debe estar completo"),
  check("dni").notEmpty().withMessage("El DNI debe estar completo"),
  check("birth")
    .notEmpty()
    .withMessage("La fecha de nacimiento debe estar completa"),
  check("address").notEmpty().withMessage("La dirección debe estar completa"),
  check("cp").notEmpty().withMessage("El código postal debe estar completo"),
  check("email")
    .notEmpty()
    .withMessage("La contraseña debe estar completa")
    .isEmail()
    .withMessage("No es un email válido"),
  check("password").notEmpty().withMessage("La contraseña debe estar completa"),
];

exports.validateUserEdit = [
  check("first_name").notEmpty().withMessage("El nombre debe estar completo"),
  check("last_name").notEmpty().withMessage("El apellido debe estar completo"),
  check("dni").notEmpty().withMessage("El DNI debe estar completo"),
  check("birth")
    .notEmpty()
    .withMessage("La fecha de nacimiento debe estar completa"),
  check("address").notEmpty().withMessage("La dirección debe estar completa"),
  check("cp").notEmpty().withMessage("El código postal debe estar completo"),
  check("email")
    .notEmpty()
    .withMessage("La contraseña debe estar completa")
    .isEmail()
    .withMessage("No es un email válido"),
];

exports.validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("El corre electrónico debe estar completo")
    .isEmail()
    .withMessage("El correo electrónico debe ser válido"),
  check("password").notEmpty().withMessage("La contraseña debe estar completa"),
];
