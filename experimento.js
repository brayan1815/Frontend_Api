import { get } from "./api.js";

const ciudades = async () => {
    const request = await  fetch('http://localhost:3000/ciudades')
    const ciudades = await request.json()
    return ciudades;
}

ciudades().then((dato)=>{
    // console.log(dato)
})

const ciu=await get("ciudades");

console.log(ciu);