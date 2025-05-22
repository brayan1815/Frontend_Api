import { get, put } from "../api.js";
import { limpiar, validar } from "../modules/modulos.js";
import { cargarCiudades, cargarGeneros, cargarLenguajes } from "./cargarDatos.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const usu=await get("usuarios/"+id)
const usuario=usu.data;
await cargarGeneros();
await cargarCiudades();

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="documento"]');
const nombre_usuario=document.querySelector('[name="nombre"]');
const apellido_usuario=document.querySelector('[name="apellido"]');
const telefono_usuario=document.querySelector('#telefono');
const constrasenia_usuario=document.querySelector('[name="contrasena"]')
const ciudad_usuario=document.querySelector('[name="id_ciudad"]')
const radios_genero=document.querySelectorAll('[name="id_genero"]')

//cargar los datos ingresados anteriomente  

documento_usuario.value=usuario.documento;
nombre_usuario.value=usuario.nombre;
apellido_usuario.value=usuario.apellido
telefono_usuario.value=usuario.telefono
constrasenia_usuario.value=usuario.contrasena
ciudad_usuario.value=usuario.id_ciudad;

nombre_usuario.addEventListener('blur',limpiar);
documento_usuario.addEventListener('blur',limpiar);
apellido_usuario.addEventListener('blur',limpiar);
telefono_usuario.addEventListener('blur',limpiar);
constrasenia_usuario.addEventListener('blur',limpiar);
ciudad_usuario.addEventListener('blur',limpiar);


radios_genero.forEach(radio => {
    if(radio.getAttribute("value")==usuario.id_genero)radio.checked=true;
});

formulario.addEventListener('submit',async(event)=>{
    const info=validar(event);
    if(info!=false){
        const respuesta=await put(`usuarios/${id}`,info)
        console.log(respuesta)
    }
})