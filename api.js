export const get=async(endpoint)=>{
    const data= await fetch(`http://localhost:3000/`+endpoint);
    return await data.json();
}

export const post=async(endpoint,info)=>{

    return await fetch(`http://localhost:3000/`+endpoint,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    })
}

export const put=async(endpoint,info)=>{
    return await fetch(`http://localhost:3000/`+endpoint,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    })
}

export const del=async(endpoint)=>{
    return await fetch(`http://localhost:3000/`+endpoint,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
}