import { agregaraDB, limpiar, validar, validarMinimo } from "../modules/modulos.js";
import { del, get } from "../api.js";
import { crearTablaCiudades } from "./cargardatos.js";

const ciudades=await get("ciudades");

crearTablaCiudades(["ID","Ciudad"],ciudades.data);


const formulario=document.querySelector("form");
const nombre_ciudad=document.querySelector('[name="ciudad_nombre"]');

formulario.addEventListener('submit',(event)=>{agregaraDB(event,"ciudades")});
nombre_ciudad.addEventListener('blur',limpiar)
nombre_ciudad.addEventListener('blur',validarMinimo)
window.addEventListener('click',async(event)=>{
    if(event.target.matches(".editar")){
        const id=event.target.getAttribute("id");
        window.location.href=`actualizarCiudades.html?id=${encodeURIComponent(id)}`
    }
    if(event.target.matches(".eliminar")){
        const id=event.target.getAttribute("id");
        let respuesta=await del(`ciudades/${id}`)
        console.log(respuesta)
    }
})


