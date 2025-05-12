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

export const validar=(event)=>{
    event.preventDefault();

    const campos=[...event.target].filter((campo)=>{
        if(campo.hasAttribute("required")) return campo;
    })
    console.log(campos);
    campos.forEach(campo=>{
        let tipo=campo.tagName;
        console.log(tipo);
        
        switch(tipo){
            case "INPUT":
                if(campo.value==""){
                    campo.classList.add("border-red");
                    campo.focus();
                    if(campo.nextElementSibling) campo.nextElementSibling.remove();
                    let afterend=document.createElement('span');
                    afterend.textContent=`El campo ${campo.getAttribute("name")} no puede estar vacio`;
                    campo.insertAdjacentElement('afterend',afterend);
                }
                break;
            case "SELECT":
                if (campo.selectedIndex == 0) {
                    campo.classList.add("border-red");
                    if (campo.nextElementSibling) campo.nextElementSibling.remove();
                    let afterend = document.createElement('span');
                    afterend.textContent = "Debe seleccionar un elemento"
                    campo.insertAdjacentElement('afterend', afterend);
                }
                break;
        }
    })

    const radios=campos.filter((campo)=>{
        if(campo.type=="radio")return campo;
    })

    const validarChequeoRdios=(radios)=>{
        for(let n=0;n<radios.length;n++){
            if(radios[n].checked)return true;
        }
        return false;
    }

    console.log(validarChequeoRdios(radios))

    if(validarChequeoRdios(radios)==false){
        let par=radios[0].parentElement;
        let contenRadios=par.parentElement;
        contenRadios.classList.add("border-red");
        if (contenRadios.nextElementSibling) contenRadios.nextElementSibling.remove();
        let afterend = document.createElement('span');
        afterend.textContent = "Debe seleccionar un genero"
        contenRadios.insertAdjacentElement('afterend', afterend);
    }

    const cheboxs=campos.filter((campo)=>{
        if(campo.type=="checkbox")return campo;
    })

    const cheboxs_seleccionados=cheboxs.filter((checbox) => checbox.checked)
    console.log(cheboxs_seleccionados)
    if(cheboxs_seleccionados.length<3){
        let pad=cheboxs[0].parentElement;
        let padre_checboxs=pad.parentElement;
        padre_checboxs.classList.add("border-red")
        if (padre_checboxs.nextElementSibling) padre_checboxs.nextElementSibling.remove();
        let afterend = document.createElement('span');
        afterend.textContent = "Debe seleccionar minimo 3 lenguajes"
        padre_checboxs.insertAdjacentElement('afterend', afterend);
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
    }
}

export const validarMaximo=event=>{
    let maximo=event.target.getAttribute("max");
    // console.log(maximo);
    if(event.target.value.length>=maximo && event.key!="Backspace"){
        event.preventDefault();
    }
}
