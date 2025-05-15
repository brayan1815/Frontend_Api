import { limpiar, validar, validarMinimo } from "../modules/modulos.js";

const formulario=document.querySelector("form");
const nombre_genero=document.querySelector('[name="genero"]');

formulario.addEventListener('submit',validar);
nombre_genero.addEventListener('blur',limpiar)
nombre_genero.addEventListener('blur',validarMinimo)