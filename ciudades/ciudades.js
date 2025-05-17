import { limpiar, validar, validarMinimo } from "../modules/modulos.js";
import { get } from "../api.js";

const ciudades=await get("ciudades");
console.log(ciudades)



const formulario=document.querySelector("form");
const nombre_ciudad=document.querySelector('[name="ciudad_nombre"]');

formulario.addEventListener('submit',validar);
nombre_ciudad.addEventListener('blur',limpiar)
nombre_ciudad.addEventListener('blur',validarMinimo)


