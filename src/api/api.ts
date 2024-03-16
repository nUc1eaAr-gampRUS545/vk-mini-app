export const getFacts = ()=>{
    return  fetch("https://catfact.ninja/fact")
    .then((response) => response.json())
}
export const searchNameInServer = (inputValue:string)=>{
    return fetch(`https://api.agify.io?name=${inputValue}`)
      .then((response) => response.json())
}