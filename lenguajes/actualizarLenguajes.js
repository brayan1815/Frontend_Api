import { get, put } from "../api.js";
import { limpiar, validar, validarMinimo } from "../modules/modulos.js";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const formulario=document.querySelector("form");
const nombre_lenguaje=document.querySelector('[name="lenguaje"]');

const len=await get("lenguajes/"+id)
const lenguaje=len.data;

nombre_lenguaje.value=lenguaje.lenguaje;

formulario.addEventListener('submit',async(event)=>{
    const info=await validar(event);
    if(info!=false){
        const respuesta=await put(`lenguajes/${id}`,info)
        console.log(respuesta);

        if(respuesta.status==200)alert("El registro se ha actualizado correctamente")
    }
})

nombre_lenguaje.addEventListener("blur",limpiar);
nombre_lenguaje.addEventListener("blur",validarMinimo)  