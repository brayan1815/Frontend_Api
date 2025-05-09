export const validarLetras=(event)=>{
    let tecla=event.key;
    const letras_permitidas=/[a-zñáéíóú\s]/i;
    if(!letras_permitidas.test(tecla)&& tecla!="Backspace"){
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