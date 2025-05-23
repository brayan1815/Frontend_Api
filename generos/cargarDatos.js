export const crearTablaGeneros=(info_encabezado,info)=>{
    if(info.length>0){
        const body=document.querySelector("body");

        const tabla=document.createElement("table");
        tabla.classList.add('tabla',"tabla--pequeña");

        /*----------------------CREACION DEL ENCABEZADO----------------- */
        const encabezado=document.createElement("thead");
        encabezado.classList.add("tabla__encabezado");
        const filaEncabezado=document.createElement("tr")

        info_encabezado.forEach(nombre => {
            const campo=document.createElement("th")
            campo.textContent=nombre;
            filaEncabezado.append(campo);
        });
        tabla.append(filaEncabezado);

        /*--------------------CREACION DEL CUERPO DE LA TABLA-----------------*/
        const cuerpo=document.createElement("tbody");
        cuerpo.classList.add("tabla__cuerpo");

        info.forEach(registroGenero => {
            const fila=document.createElement("tr")
            fila.classList.add("tabla__fila");
            Object.keys(registroGenero).forEach(llave=>{
                const campo=document.createElement("th");
                campo.classList.add("tabla__campo");
                campo.textContent=registroGenero[llave];
                fila.append(campo);
            })


            const Opciones=document.createElement("th");
            Opciones.classList.add("tabla__campo");

            const contenedorBotones=document.createElement("div");
            contenedorBotones.classList.add("botonesTabla")

            const botonEditar=document.createElement("button");
            botonEditar.classList.add("botonesTabla__boton","editar");
            const iconoEdit=document.createElement("i");
            iconoEdit.classList.add("bi", "bi-pencil-square")
            botonEditar.setAttribute("id",registroGenero.genero_id)
            botonEditar.append(iconoEdit)
            contenedorBotones.append(botonEditar);

            const botonEliminar=document.createElement("button")
            botonEliminar.classList.add("botonesTabla__boton","botonesTabla__boton--rojo","editar");
            const iconElim=document.createElement("i");
            iconElim.classList.add("bi","bi-trash-fill")
            botonEliminar.setAttribute("id",registroGenero.genero_id)
            botonEliminar.append(iconElim);
            contenedorBotones.append(botonEliminar);

            Opciones.append(contenedorBotones);

            fila.append(Opciones)
            cuerpo.append(fila);
            
        })
        tabla.append(cuerpo);
        body.append(tabla);
    }
}