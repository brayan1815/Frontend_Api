import { validarLetras, validarNumeros } from "../modules/usuarios_modules.js";

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="nombre"]')
const nombre_usuario=document.querySelector('[name="nombre"]')
const apellido_usuario=document.querySelector('[name="apellido"]')


documento_usuario.addEventListener('keydown',validarNumeros)
nombre_usuario.addEventListener('keydown',validarLetras);
apellido_usuario.addEventListener('keydown',validarLetras)