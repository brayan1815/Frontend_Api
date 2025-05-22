import { get } from "../api.js";

export const cargarCiudades=async ()=>{

    const ciudades=await get("ciudades");

    const select =document.querySelector('[name="id_ciudad"]');

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
            radio.setAttribute('name',"id_genero");
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
            checbox.setAttribute('name',"id_lenguaje");
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

export const crearTablaUsuarios=async (info)=>{

    // const usuarios=await get("usuarios");
    const generos=await get("generos");
    const ciudades=await get("ciudades");

    const body=document.querySelector("body");


    const tabla=document.createElement("table");

    /*-------------------CREACION DEL ENCABEZADO------------------------*/
    tabla.classList.add('tabla');

    const encabezado=document.createElement("thead");
    encabezado.classList.add("tabla__encabezado");

    const filaEncabezado=document.createElement("tr")


    Object.keys(info[0]).forEach(llave=>{
        const celdaEncabezado=document.createElement("th");
        if(llave!="id_genero" && llave!="id_ciudad")celdaEncabezado.textContent=llave;
        else{
            if(llave=="id_genero") celdaEncabezado.textContent="genero"
            if(llave=="id_ciudad") celdaEncabezado.textContent="ciudad"
        }
        filaEncabezado.append(celdaEncabezado);
    })

    encabezado.append(filaEncabezado);
    tabla.append(encabezado);

    /*-------------------- CREACION DEL CUERPO -------------------------------*/
    const cuerpo=document.createElement("tbody");
    cuerpo.classList.add("tabla__cuerpo")

    info.forEach(registro => {
        const filaCuerpo=document.createElement("tr");
        filaCuerpo.classList.add("tabla__fila");
        Object.keys(registro).forEach((llave)=>{
            const campoCuerpo=document.createElement("th")
            campoCuerpo.classList.add("tabla__campo");
            if(llave!="id_genero" && llave!="id_ciudad")campoCuerpo.textContent=registro[llave];
            else{
                if(llave=="id_ciudad"){
                    ciudades.data.forEach(ciudad => {
                        if(ciudad.ciudad_id==registro[llave]) campoCuerpo.textContent=ciudad.ciudad_nombre;
                    });
                }
                if(llave=="id_genero"){
                    generos.data.forEach(genero=>{
                        if(genero.genero_id==registro[llave])campoCuerpo.textContent=genero.genero;
                    })
                }
            }
            filaCuerpo.append(campoCuerpo);
        })
        const Opciones=document.createElement("th");
        Opciones.classList.add("tabla__campo");


        /*----Creacion de los botones de la tabla --- */

        const contenedorBotones=document.createElement("div");
        contenedorBotones.classList.add("botonesTabla")

        const botonEditar=document.createElement("button");
        botonEditar.classList.add("botonesTabla__boton","editar");
        const iconoEdit=document.createElement("i");
        iconoEdit.classList.add("bi", "bi-pencil-square")
        botonEditar.append(iconoEdit)
        botonEditar.setAttribute("id",registro.usuario_id)
        contenedorBotones.append(botonEditar);

        const botonEliminar=document.createElement("button")
        botonEliminar.classList.add("botonesTabla__boton","botonesTabla__boton--rojo","eliminar");
        const iconElim=document.createElement("i");
        iconElim.classList.add("bi","bi-trash-fill")
        botonEliminar.setAttribute("id",registro.usuario_id);
        botonEliminar.append(iconElim);

        contenedorBotones.append(botonEliminar);

        Opciones.append(contenedorBotones);

        filaCuerpo.append(Opciones)
        cuerpo.append(filaCuerpo);
    });
    tabla.append(cuerpo);
    body.append(tabla)
}

export const crearTablaLenguajeUsuario=async(encabezado,info)=>{

}