import { get, post } from "../api.js";

export const validarLetras=(event)=>{
    let tecla=event.key;
    const letras=/[a-zñáéíóú\s]/i;
    if(!letras.test(tecla)&& tecla!="Backspace"){
        event.preventDefault();
    }
}

export const validarNumeros=(event)=>{
    let tecla=event.key;
    const numeros=/[0-9]/;
    if(!numeros.test(tecla) && tecla!="Backspace"){
    event.preventDefault();
  }
}

const validarContrasenia=(campo)=>{
    // console.log(campo);
    const expresion=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

    if(campo.value.match(expresion))return true
    else return false;
}

export const validar= async (event,endpoint)=>{
    let info={};
    event.preventDefault();

    const campos=[...event.target].filter((campo)=>{
        if(campo.hasAttribute("required")) return campo;
    })
    // console.log(campos);
    campos.forEach(campo=>{
        let tipo=campo.tagName;
        
        switch(tipo){
            case "INPUT":
                
                if(campo.getAttribute('type')=="text"){
                    if(campo.value==""){
                        campo.classList.add("border-red");
                        campo.focus();
                        if(campo.nextElementSibling) campo.nextElementSibling.remove();
                        let afterend=document.createElement('span');
                        afterend.textContent=`El campo ${campo.getAttribute("name")} no puede estar vacio`;
                        campo.insertAdjacentElement('afterend',afterend);
                    }else{
                        // console.log(campo);
                        if(validarMinimotwo(campo)){
                            let propiedad=campo.getAttribute('name');
                            info[propiedad]=campo.value;
                        }
                    }
                    
                }else if(campo.getAttribute('type')=="password"){

                    if (campo.value==""){
                        campo.classList.add("border-red");
                        campo.focus();
                        if(campo.nextElementSibling) campo.nextElementSibling.remove();
                        let afterend=document.createElement('span');
                        afterend.textContent=`El campo ${campo.getAttribute("name")} no puede estar vacio`;
                        campo.insertAdjacentElement('afterend',afterend);
                    }
                    else{
                        console.log(validarContrasenia(campo))
                        if(validarContrasenia(campo)){
                            let propiedad=campo.getAttribute('name');
                            info[propiedad]=campo.value;
                        }
                    }

                }
                break;
            case "SELECT":
                if (campo.selectedIndex == 0) {
                    campo.classList.add("border-red");
                    if (campo.nextElementSibling) campo.nextElementSibling.remove();
                    let afterend = document.createElement('span');
                    afterend.textContent = "Debe seleccionar un elemento"
                    campo.insertAdjacentElement('afterend', afterend);
                }else{
                    let propiedad=campo.getAttribute('name');
                    info[propiedad]=campo.value;
                }
                break;
        }
    })

    const radios=campos.filter((campo)=>{
        if(campo.type=="radio")return campo;
    })

    if(radios.length>0){
        const validarChequeoRdios=(radios)=>{
            for(let n=0;n<radios.length;n++){
                if(radios[n].checked){
                    let propiedad=radios[n].getAttribute('name');
                    let valor=radios[n].getAttribute('value');
                    info[propiedad]=valor;
                    return true
                };
            }
            return false;
        }
    
        if(validarChequeoRdios(radios)==false){
            let par=radios[0].parentElement;
            let contenRadios=par.parentElement;
            contenRadios.classList.add("border-red");
            if (contenRadios.nextElementSibling) contenRadios.nextElementSibling.remove();
            let afterend = document.createElement('span');
            afterend.textContent = "Debe seleccionar un genero"
            contenRadios.insertAdjacentElement('afterend', afterend);
        }
    }


    const cheboxs=campos.filter((campo)=>{
        if(campo.type=="checkbox")return campo;
    })
    
    if(cheboxs.length>0){
        const cheboxs_seleccionados=cheboxs.filter((checbox) => checbox.checked)
        if(cheboxs_seleccionados.length<3){
            let pad=cheboxs[0].parentElement;
            let padre_checboxs=pad.parentElement;
            padre_checboxs.classList.add("border-red")
            if (padre_checboxs.nextElementSibling) padre_checboxs.nextElementSibling.remove();
            let afterend = document.createElement('span');
            afterend.textContent = "Debe seleccionar minimo 3 lenguajes"
            padre_checboxs.insertAdjacentElement('afterend', afterend);
        }else{
            let lenguajes=[];
            for(let n=0;n<cheboxs_seleccionados.length;n++){
                let valor=cheboxs_seleccionados[n].value;
                lenguajes.push(valor)
            }
            let propiedad=cheboxs_seleccionados[0].getAttribute('name');
            info[propiedad]=lenguajes;
        }
    }

    let cant_campos=contarCampos(event.target);
    if(Object.keys(info).length>=cant_campos){
        const respuesta=await post(endpoint,info)

        if (endpoint == "usuarios") {
            for (let n = 0; n < info.id_lenguaje.length; n++) {
            let regi = {};
            let usu = await get("usuarios");
            let id_usu = usu.data[usu.data.length - 1].usuario_id;

            
            regi["id_usuario"] = parseInt(id_usu);
            regi["id_lenguaje"] = parseInt(info.id_lenguaje[n]);

            console.log("Enviando:", regi); 

            await post("lenguajeUsuarios", regi);
    }
}

        console.log(respuesta);
    }
    

}

export const limpiar = (event) => {
    if (event.target.value != "" && event.target.selectedIndex!=0) {
      event.target.classList.remove("border-red");
      if (event.target.nextElementSibling) {
        event.target.nextElementSibling.remove();
      }
    }
}

export const limpiarRadios=(event)=>{
    let radio=event.target;
    let pad=radio.parentElement;
    let padreRadios=pad.parentElement;
    padreRadios.classList.remove("border-red");
    if (padreRadios.nextElementSibling) {
        padreRadios.nextElementSibling.remove();
      }
}

export const limpiarChecboxs=(event)=>{
    let chec=event.target.parentElement;
    let checboxsContenedor=chec.parentElement;
    let che=checboxsContenedor.childNodes;

    let cheboxs=[];

    che.forEach(element => {
        if(element.tagName=="DIV"){
            element.childNodes.forEach(element => {
                if(element.tagName=="INPUT")cheboxs.push(element);
            });
        }
    });
    
    const cheboxs_seleccionados=cheboxs.filter((checbox) => checbox.checked)
    if(cheboxs_seleccionados.length>=3){
        checboxsContenedor.classList.remove("border-red");
        if (checboxsContenedor.nextElementSibling) {
            checboxsContenedor.nextElementSibling.remove();
        }
    }
}

export const validarMinimo=(event)=>{
    let minimo=event.target.getAttribute("min");
    if(event.target.value.length<minimo){
        event.target.classList.add("border-red")
        if (event.target.nextElementSibling) event.target.nextElementSibling.remove();
        let afterend = document.createElement('span');
        afterend.textContent = `El campo ${event.target.getAttribute("name")} debe tener minimo ${minimo} caracteres`
        event.target.insertAdjacentElement('afterend', afterend);
        return false;
    }else return true;
}

const validarMinimotwo=(campo)=>{
    let minimo=campo.getAttribute('min');
    let valor=campo.value.length;
    if(valor<minimo) return false
    else return true;
}

export const validarMaximo=event=>{
    let maximo=event.target.getAttribute("max");
    // console.log(maximo);
    if(event.target.value.length>=maximo && event.key!="Backspace"){
        event.preventDefault();
    }
}

export const validarContraseniaMensaje=event=>{
    const expresion=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    if(!event.target.value.match(expresion)){
        if (event.target.nextElementSibling) event.target.nextElementSibling.remove();
        let afterend = document.createElement('span');
        afterend.textContent = `la contraseña debe tener minimo una mayuscula, una minuscula, un caracter especial y 8 caracteres`
        event.target.insertAdjacentElement('afterend', afterend);
        return false
    }else return true;
}

const contarCampos=formulario=>{
    const campos=formulario.querySelectorAll(".padre_input");
    return campos.length;
}

let id=1;
const egregarFilaTabla=(info)=>{
    let filasTabla=document.querySelectorAll(".tabla__fila");
    let ultimaFila=filasTabla[filasTabla.length-1];

    let elemento=document.createElement('th');
            elemento.textContent=id;
            elemento.classList.add('tabla__campo');
            ultimaFila.insertAdjacentElement('beforeend',elemento);

    Object.keys(info).forEach(llave=>{
        if(llave!="lenguaje"){
            let elemento=document.createElement('th');
            elemento.textContent=info[llave];
            elemento.classList.add('tabla__campo');
            ultimaFila.insertAdjacentElement('beforeend',elemento);
        }
    })
    let nuevaFila=document.createElement('tr');
    nuevaFila.classList.add('tabla__fila');
    ultimaFila.insertAdjacentElement('afterend',nuevaFila);
    id++;
}
