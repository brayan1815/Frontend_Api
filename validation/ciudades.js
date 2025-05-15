import { limpiar, validar, validarMinimo } from "../modules/modulos.js";

const formulario=document.querySelector("form");
const nombre_ciudad=document.querySelector('[name="ciudad"]');

formulario.addEventListener('submit',validar);
nombre_ciudad.addEventListener('blur',limpiar)
nombre_ciudad.addEventListener('blur',validarMinimo)