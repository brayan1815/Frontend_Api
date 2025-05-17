import { get } from "../api.js";

export const cargarCiudades=async ()=>{

    const ciudades=await get("ciudades");

    const select =document.querySelector('[name="ciudad"]');

    ciudades.data.forEach(ciudad => {
        let opcion=document.createElement("option");
        opcion.textContent=ciudad.ciudad_nombre;
        opcion.setAttribute('value', ciudad.ciudad_id);
        select.append(opcion);
    });
}

export const cargarGeneros=async()=>{
    const generos=await get("generos");
    const padreRadios=document.querySelector('#formulario__radios');

    if(generos.data.length>0){
        padreRadios.classList.add("formulario__radios");

        generos.data.forEach(genero => {

            let formularioRadio=document.createElement("div");
            formularioRadio.classList.add("formulario__radio");
            
            let radio=document.createElement("input");
            radio.setAttribute('type',"radio");
            radio.setAttribute('id',genero.genero)
            radio.setAttribute('name',"genero");
            radio.setAttribute('required',true);
            radio.setAttribute('value', genero.genero_id);
            formularioRadio.append(radio);

            let label=document.createElement("label");
            label.setAttribute('for',genero.genero);
            label.textContent=genero.genero;
            formularioRadio.append(label);

            padreRadios.append(formularioRadio);
        });
    }
}

export const cargarLenguajes=async()=>{
    const lenguajes=await get("lenguajes");

    const padreLenguajes=document.querySelector("#formulario__checboxs");

    if(lenguajes.data.length>0){

        padreLenguajes.classList.add("formulario__checboxs");

        lenguajes.data.forEach(lenguaje => {
            let formularioChecbox=document.createElement('div');
            formularioChecbox.classList.add("formulario__checbox");
    
            let checbox=document.createElement("input");
            checbox.setAttribute('type',"checkbox");
            checbox.setAttribute('id',lenguaje.lenguaje);
            checbox.setAttribute('name',"lenguaje");
            checbox.setAttribute('required',true);
            checbox.setAttribute('value',lenguaje.lenguaje_id);
            formularioChecbox.append(checbox);
            
            let label=document.createElement('label');
            label.setAttribute('for',lenguaje.lenguaje);
            label.textContent=lenguaje.lenguaje;
            formularioChecbox.append(label);

            padreLenguajes.append(formularioChecbox);
        });

    }
}

export const crearTabla=async ()=>{

    const usuarios=await get("usuarios");
    const generos=await get("generos");
    const ciudades=await get("ciudades");

    const body=document.querySelector("body");


    const tabla=document.createElement("table");

    /*-------------------CREACION DEL ENCABEZADO------------------------*/
    tabla.classList.add('tabla');

    const encabezado=document.createElement("thead");
    encabezado.classList.add("tabla__encabezado");

    const filaEncabezado=document.createElement("tr")

    const encabezadoId=document.createElement("th");
    const encabezadoDocumento=document.createElement("th");
    const encabezadoNombre=document.createElement("th");
    const encabezadoApellido=document.createElement("th");
    const encabezadoTelefono=document.createElement("th");
    const encabezadoContrasenia=document.createElement("th");
    const encabezadoGenero=document.createElement("th");
    const encabezadoCiudad=document.createElement("th");
    const encabezadoOpciones=document.createElement("th");
    encabezadoId.textContent="ID";
    encabezadoDocumento.textContent="Documento";
    encabezadoNombre.textContent="Nombre";
    encabezadoApellido.textContent="Apellido";
    encabezadoTelefono.textContent="Telefono";
    encabezadoContrasenia.textContent="Contrasenia";
    encabezadoGenero.textContent="Genero";
    encabezadoCiudad.textContent="Ciudad";
    encabezadoOpciones.textContent="Opciones";

    filaEncabezado.append(encabezadoId,encabezadoDocumento,encabezadoNombre,encabezadoApellido,encabezadoTelefono,encabezadoContrasenia,encabezadoGenero,encabezadoCiudad,encabezadoOpciones);
    encabezado.append(filaEncabezado);
    tabla.append(encabezado);

    /*-------------------- CREACION DEL CUERPO -------------------------------*/
    const cuerpo=document.createElement("tbody");
    cuerpo.classList.add("tabla__cuerpo")

    usuarios.data.forEach(usuario => {
        const filaCuerpo=document.createElement("tr");
        filaCuerpo.classList.add("tabla__fila");

        const Id=document.createElement("th");
        Id.classList.add("tabla__campo");
        const Documento=document.createElement("th");
        Documento.classList.add("tabla__campo");
        const Nombre=document.createElement("th");
        Nombre.classList.add("tabla__campo");
        const Apellido=document.createElement("th");
        Apellido.classList.add("tabla__campo");
        const Telefono=document.createElement("th");
        Telefono.classList.add("tabla__campo");
        const Contrasenia=document.createElement("th");
        Contrasenia.classList.add("tabla__campo");
        const Genero=document.createElement("th");
        Genero.classList.add("tabla__campo");
        const Ciudad=document.createElement("th");
        Ciudad.classList.add("tabla__campo");
        const Opciones=document.createElement("th");
        Opciones.classList.add("tabla__campo");

        Id.textContent=usuario.usuario_id;
        Documento.textContent=usuario.documento;
        Nombre.textContent=usuario.nombre;
        Apellido.textContent=usuario.apellido;
        Telefono.textContent=usuario.telefono;
        Contrasenia.textContent=usuario.contrasena;
        generos.data.forEach(genero => {
            if(genero.genero_id==usuario.id_genero){
                Genero.textContent=genero.genero;
            }
        });
        ciudades.data.forEach(ciudad => {
            if(ciudad.ciudad_id==usuario.id_ciudad){
                Ciudad.textContent=ciudad.ciudad_nombre;
            }
        });

        /*----Creacion de los botones de la tabla --- */

        const contenedorBotones=document.createElement("div");
        contenedorBotones.classList.add("botonesTabla")

        const botonEditar=document.createElement("button");
        botonEditar.classList.add("botonesTabla__boton");
        const iconoEdit=document.createElement("i");
        iconoEdit.classList.add("bi", "bi-pencil-square")
        botonEditar.append(iconoEdit)
        contenedorBotones.append(botonEditar);

        const botonEliminar=document.createElement("button")
        botonEliminar.classList.add("botonesTabla__boton","botonesTabla__boton--rojo");
        const iconElim=document.createElement("i");
        iconElim.classList.add("bi","bi-trash-fill")
        botonEliminar.append(iconElim);
        contenedorBotones.append(botonEliminar);

        Opciones.append(contenedorBotones);

        filaCuerpo.append(Id,Documento,Nombre,Apellido,Telefono,Contrasenia,Genero,Ciudad,Opciones)
        cuerpo.append(filaCuerpo);
    });
    tabla.append(cuerpo);
    body.append(tabla)
}