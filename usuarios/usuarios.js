import { validarMaximo, limpiar, limpiarChecboxs, limpiarRadios, validar, validarLetras, validarNumeros, validarMinimo, validarContraseniaMensaje } from "../modules/modulos.js";

import { cargarCiudades, cargarGeneros, cargarLenguajes, crearTabla } from "./cargarDatos.js";

cargarLenguajes();
cargarGeneros();
crearTabla();

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="documento"]');
const nombre_usuario=document.querySelector('[name="nombre"]');
const apellido_usuario=document.querySelector('[name="apellido"]');
const telefono_usuario=document.querySelector('#telefono');
const constrasenia_usuario=document.querySelector('[name="contrasenia"]')
const ciudad_usuario=document.querySelector('[name="ciudad"]')
const radios_genero=document.querySelectorAll('[name="genero"]')
const cheboxs_lenguajes=document.querySelectorAll('[name="lenguaje"]')



ciudad_usuario.addEventListener('click',cargarCiudades());
formulario.addEventListener('submit',validar)
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
telefono_usuario.addEventListener('keydown',validarMaximo)
telefono_usuario.addEventListener('blur',validarMinimo)
documento_usuario.addEventListener('blur',validarMinimo)
nombre_usuario.addEventListener('blur',validarMinimo);
apellido_usuario.addEventListener('blur',validarMinimo)
constrasenia_usuario.addEventListener('blur',validarContraseniaMensaje)
