import { del, get, post, put } from "../api.js";
import { limpiar, validar, validarContraseniaMensaje, validarLetras, validarMaximo, validarMinimo, validarNumeros } from "../modules/modulos.js";
import { cargarCiudades, cargarGeneros, cargarLenguajes } from "./cargarDatos.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const usu=await get("usuarios/"+id)
const usuario=usu.data;
await cargarGeneros();
await cargarCiudades();
await cargarLenguajes();

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="documento"]');
const nombre_usuario=document.querySelector('[name="nombre"]');
const apellido_usuario=document.querySelector('[name="apellido"]');
const telefono_usuario=document.querySelector('#telefono');
const constrasenia_usuario=document.querySelector('[name="contrasena"]')
const ciudad_usuario=document.querySelector('[name="id_ciudad"]')
const radios_genero=document.querySelectorAll('[name="id_genero"]')
const cheboxs_lenguajes=document.querySelectorAll('[name=id_lenguaje]')

//cargar los datos ingresados anteriomente  

documento_usuario.value=usuario.documento;
nombre_usuario.value=usuario.nombre;
apellido_usuario.value=usuario.apellido
telefono_usuario.value=usuario.telefono
constrasenia_usuario.value=usuario.contrasena
ciudad_usuario.value=usuario.id_ciudad;

nombre_usuario.addEventListener('blur',limpiar);
nombre_usuario.addEventListener('keydown',validarMaximo)
nombre_usuario.addEventListener('keydown',validarLetras)
nombre_usuario.addEventListener('blur',validarMinimo)
documento_usuario.addEventListener('keydown',validarNumeros);
documento_usuario.addEventListener('keydown',validarMaximo)
documento_usuario.addEventListener('keydown',validarMinimo)
documento_usuario.addEventListener('blur',limpiar);
apellido_usuario.addEventListener('blur',limpiar);
apellido_usuario.addEventListener('keydown',validarMaximo)
apellido_usuario.addEventListener('keydown',validarLetras)
apellido_usuario.addEventListener('blur',validarMinimo)
telefono_usuario.addEventListener('blur',limpiar);
telefono_usuario.addEventListener('keydown',validarNumeros)
telefono_usuario.addEventListener('keydown',validarMaximo)
telefono_usuario.addEventListener('keydown',validarMinimo)
constrasenia_usuario.addEventListener('blur',limpiar);
constrasenia_usuario.addEventListener('blur',validarContraseniaMensaje);
ciudad_usuario.addEventListener('blur',limpiar);

formulario.addEventListener('submit',async(event)=>{
    const info=await validar(event);
    if(info!=false){
        const lenUsu=await get("lenguajeUsuarios");
        
        for(let n=0;n<lenUsu.data.length;n++){

            if(lenUsu.data[n].id_usuario==id){
                
                const respuesta=await del(`lenguajeUsuarios/${lenUsu.data[n].id}`)

            }
        }        
        
        const infoCambiada = {...info};
        delete infoCambiada.id_lenguaje;

        // console.log(infoCambiada);
        

        const respuesta=await put(`usuarios/${id}`,infoCambiada);
        
        for(let n=0;n<info.id_lenguaje.length;n++){

            let datos={};

            const id_usu=parseInt(id);
            const id_len=parseInt(info.id_lenguaje[n]);

            datos["id_usuario"]=id_usu;
            datos["id_lenguaje"]=id_len

            // console.log(datos);
            

            await post(`lenguajeUsuarios`,datos);
        }
        if(respuesta.status==200)alert("El registro se ha actualizado correctamente")
    }
})


const len_usu=await get(`lenguajeUsuarios`);

let seleccionados=[];
len_usu.data.forEach(len => {
    if(len.id_usuario==id) seleccionados.push(len.id_lenguaje)
});


radios_genero.forEach(radio => {
    if(radio.getAttribute("value")==usuario.id_genero)radio.checked=true;
});

cheboxs_lenguajes.forEach(chec=>{
    seleccionados.forEach(id_len=>{
        if(chec.getAttribute("value")==id_len){
            chec.checked=true;
        }
    })
})

// formulario.addEventListener('submit',async(event)=>{
//     const info=validar(event);
//     if(info!=false){
//         const respuesta=await put(`usuarios/${id}`,info)
//         console.log(respuesta)
//     }
// })

