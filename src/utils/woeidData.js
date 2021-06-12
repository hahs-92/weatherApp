const QUERYLATLOT = 'lattlong'
// const CORSHEROKU = "https://cors-anywhere.herokuapp.com/"
const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=' 
const URLAPI = "https://www.metaweather.com/api/"


export const getWoeidData = async(coord, query = QUERYLATLOT) => {
    try {  
      const response = await fetch(`${ CORS_PROXY_URL }${ URLAPI }location/search/?${ query }=${ coord }`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("ErrorgetWoeid ",error.message)
    }
}