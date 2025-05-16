export const get=async(endpoint)=>{
    const data= await fetch(`http://localhost:3000/`+endpoint);
    return await data.json();
}

export const post=async(endpoint,objeto)=>{
    return await fetch(`http://localhost:3000/`+endpoint,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(objeto)
    })
}