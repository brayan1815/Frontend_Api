import { validarMaximo, limpiar, limpiarChecboxs, limpiarRadios, validar, validarLetras, validarNumeros, validarMinimo, validarContraseniaMensaje, agregaraDB } from "../modules/modulos.js";

import { cargarCiudades, cargarGeneros, cargarLenguajes, crearTablaUsuarios , crearTablaLenguajeUsuario} from "./cargarDatos.js";

import { get,del } from "../api.js";

const usuarios=await get("usuarios");

await cargarLenguajes();
await cargarGeneros();
crearTablaUsuarios(usuarios.data);

crearTablaLenguajeUsuario(["ID","Usuario","Lenguaje"])

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="documento"]');
const nombre_usuario=document.querySelector('[name="nombre"]');
const apellido_usuario=document.querySelector('[name="apellido"]');
const telefono_usuario=document.querySelector('#telefono');
const constrasenia_usuario=document.querySelector('[name="contrasena"]')
const ciudad_usuario=document.querySelector('[name="id_ciudad"]')
const radios_genero=document.querySelectorAll('[name="id_genero"]')
const cheboxs_lenguajes=document.querySelectorAll('[name="id_lenguaje"]')





ciudad_usuario.addEventListener('click',cargarCiudades());
formulario.addEventListener('submit',(event)=>{agregaraDB(event,"usuarios")})
documento_usuario.addEventListener('keydown',validarNumeros);
nombre_usuario.addEventListener('keydown',validarLetras);
apellido_usuario.addEventListener('keydown',validarLetras);
telefono_usuario.addEventListener('keydown',validarNumeros);
documento_usuario.addEventListener('blur',limpiar)
nombre_usuario.addEventListener('blur',limpiar)
apellido_usuario.addEventListener('blur',limpiar)
telefono_usuario.addEventListener('blur',limpiar)
constrasenia_usuario.addEventListener('blur',limpiar)
ciudad_usuario.addEventListener('blur',limpiar)
radios_genero.forEach(radio => {
    radio.addEventListener('change',limpiarRadios)
});
cheboxs_lenguajes.forEach(chec=>{
    chec.addEventListener('change',limpiarChecboxs)
})

documento_usuario.addEventListener('keydown',validarMaximo)
telefono_usuario.addEventListener('keydown',validarMaximo)
telefono_usuario.addEventListener('blur',validarMinimo)
documento_usuario.addEventListener('blur',validarMinimo)
nombre_usuario.addEventListener('blur',validarMinimo);
apellido_usuario.addEventListener('blur',validarMinimo)
constrasenia_usuario.addEventListener('blur',validarContraseniaMensaje)
window.addEventListener('click',async(event)=>{
    // console.log(event.target)
    if(event.target.matches('.editar')){
        const id=event.target.getAttribute("id")
        window.location.href=`actualizarUsuario.html?id=${encodeURIComponent(id)}`
    }
    if(event.target.matches(".eliminar")){
        
        const id=event.target.getAttribute("id");
        
        
        const lenUsu=(await get("lenguajeUsuarios")).data;
        
        for(let n=0;n<lenUsu.length;n++){
            if(lenUsu[n].id_usuario==id){
                
                let respuesta=await del(`lenguajeUsuarios/${lenUsu[n].id}`)      
                console.log(respuesta);
                
            }
        }
        
        let respuesta=await del(`usuarios/${id}`)
        
        if(respuesta.status==200) alert("El usuario se ha eliminado correctamente")
    }
})
