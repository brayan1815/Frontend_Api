import { get,del } from "../api.js";
import { agregaraDB, limpiar, validar, validarMinimo } from "../modules/modulos.js";

import { crearTablaLenguajes } from "./cargarDatos.js";

const lenguajes=await get("lenguajes");
crearTablaLenguajes(["ID","Lenguaje"],lenguajes.data)

const formulario=document.querySelector("form");
const nombre_lenguaje=document.querySelector('[name="lenguaje"]');

formulario.addEventListener('submit',(event)=>{agregaraDB(event,"lenguajes")});
nombre_lenguaje.addEventListener('blur',limpiar)
nombre_lenguaje.addEventListener('blur',validarMinimo)
window.addEventListener('click',async(event)=>{
    if(event.target.matches(".editar")){
        const id=event.target.getAttribute("id");
        window.location.href=`actualizarLenguaje.html?id=${encodeURIComponent(id)}`
    }
    if(event.target.matches(".eliminar")){
                const id=event.target.getAttribute("id");
                let respuesta=await del(`lenguajes/${id}`)
                console.log(respuesta)
            }
})