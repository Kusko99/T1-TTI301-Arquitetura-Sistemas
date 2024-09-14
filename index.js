//importando as bibliotecas
const axios = require("axios")
const dotenv = require("dotenv")

//importando as variáveis de ambiente
dotenv.config()
const API_KEY = process.env.API_KEY


//Função que busca as coordenadas
const obterCoordenadas = async (cidade) => {
    try{
       const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=${1}&appid=${API_KEY}`);
       const dados = response.data[0];

       if(dados){
        const {lat, lon} = dados
        console.log(`Coordenadas de ${cidade}: Latitude: ${lat}, Longitude: ${lon}`)
        return {lat, lon}
       }
       else{
        console.log(`Não foram encontradas coordenadas para ${cidade}.`)
        return null
       }
    } catch (error){
        console.log("Erro ao buscar coordenadas:", error)
    }
}


obterCoordenadas('São Paulo');