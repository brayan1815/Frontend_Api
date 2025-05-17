import { limpiar, validar, validarMinimo } from "../modules/modulos.js";

const formulario=document.querySelector("form");
const nombre_lenguaje=document.querySelector('[name="nombre_lenguaje"]');

formulario.addEventListener('submit',validar);
nombre_lenguaje.addEventListener('blur',limpiar)
nombre_lenguaje.addEventListener('blur',validarMinimo)