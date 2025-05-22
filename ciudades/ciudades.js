import { agregaraDB, limpiar, validar, validarMinimo } from "../modules/modulos.js";
import { get } from "../api.js";
import { crearTablaCiudades } from "./cargardatos.js";

const ciudades=await get("ciudades");

crearTablaCiudades(["ID","Ciudad"],ciudades.data);


const formulario=document.querySelector("form");
const nombre_ciudad=document.querySelector('[name="ciudad_nombre"]');

formulario.addEventListener('submit',(event)=>{agregaraDB(event,"ciudades")});
nombre_ciudad.addEventListener('blur',limpiar)
nombre_ciudad.addEventListener('blur',validarMinimo)


