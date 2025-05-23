import { get, put} from "../api.js";
import { limpiar, validar, validarMinimo } from "../modules/modulos.js";



const formulario=document.querySelector("form");
const nombre_ciudad=document.querySelector('[name="ciudad_nombre"]');

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const ciu=await get("ciudades/"+id);
const ciudad=ciu.data;


nombre_ciudad.value=ciudad.ciudad_nombre;


formulario.addEventListener('submit',async(event)=>{
    const info=await validar(event);
    
    if(info!=false){
        const respuesta=await put(`ciudades/${id}`,info)
        console.log(respuesta);
    }
});
nombre_ciudad.addEventListener('blur',limpiar)
nombre_ciudad.addEventListener('blur',validarMinimo)