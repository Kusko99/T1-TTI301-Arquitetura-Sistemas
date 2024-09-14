//importando as bibliotecas
const axios = require("axios")
const dotenv = require("dotenv")

//importando as variáveis de ambiente
dotenv.config()
const API_KEY = process.env.API_KEY

//constantes
//Cidade desajada
const cidade = "São Paulo"
//Unidade de medida
const units = "metric"
//idoma
const lang = "pt_br"

//Função que busca as coordenadas
const obterCoordenadas = async(cidade) => {
    try{
       const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=${1}&appid=${API_KEY}`)
       const dados = response.data[0]

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

//Função que obtem as condições atuais em função de latitude e longitude
const obterClima = async (lat, lon) => {
    try{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&units=${units}`)
    const dados = response.data
        if (dados){
            let description = dados["weather"][0]["description"]
            fell_like = dados["main"]["feels_like"]
            console.log(`Clima atual: ${description}, com uma temperatura de ${fell_like} graus.`)
            return {description, fell_like}
        }
        else{
            console.log(`Não foram encontradas dados do clima para ${lat}, ${lon}.`)
            return null
        }
    }
    catch (error){
        console.log("Erro ao buscar dados do clima:", error)
    }
}




//Main do programa
(async () => {
    const coordenadas = await obterCoordenadas(cidade);
    if (coordenadas) {
      const { lat, lon } = coordenadas;
      await obterClima(lat, lon);
    }
  })();