import { get } from "../api.js";
import { limpiar, validar, validarMinimo } from "../modules/modulos.js";
import { crearTablaGeneros } from "./cargarDatos.js";

const generos=await get("generos")
crearTablaGeneros(["ID","Lenguaje"],generos.data)

const formulario=document.querySelector("form");
const nombre_genero=document.querySelector('[name="genero"]');

formulario.addEventListener('submit',(event)=>{validar(event,"generos")});
nombre_genero.addEventListener('blur',limpiar)
nombre_genero.addEventListener('blur',validarMinimo)