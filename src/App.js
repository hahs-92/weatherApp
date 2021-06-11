import { useEffect, useState } from 'react'
//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'
//COMPONENTS
import CardWheater from './components/CardWheater'
import CardSecundary from './components/CardSecundary'
import Loader from './components/Loader'
import Error from './components/Error'
//IMAGE
import imgSearch from './assets/lupa.svg'
import imgLocationUser from './assets/cliente.svg'
import imgIconLocation from './assets/pin.svg'
import imgArrow from './assets/arrow.svg'
//UTILS
import { imgWheathers } from './utils/weatherImages'


function App() {
  const [ active, setActive ] = useState(false)
  const [ data, setData ] = useState([])
  const [ location, setLocation ] = useState('')
  const [ coords, setCoords ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ isWrong,  setIsWrong ] = useState(false)
  // const CORSHEROKU = "https://cors-anywhere.herokuapp.com/"
  const CORS_PROXY_URL = 'https://api.allorigins.win/get?url='
  const URLAPI = "https://www.metaweather.com/api/"
  let placePosition = ''
  const QUERYLATLOT = 'lattlong'
  const QUERY = 'query'

  // __________________________GEOPOSITION_________________________________________
  const positionUser = ( position) => {
    placePosition = [ position.coords.latitude, position.coords.longitude] 
  }
  const errorNavigator = (error) => {
    console.error(error.message)
  }
  navigator.geolocation.getCurrentPosition(positionUser, errorNavigator,{ enableHighAccuracy: true } )
  // _______________________________________________________________________________________

  const getWoeidData = async(coord, query = QUERYLATLOT) => {
    try {  
      const response = await fetch(`${ CORS_PROXY_URL}${URLAPI }location/search/?${ query }=${ coord }`, {
        method:'GET',
        headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
               'Origin': 'https://www.metaweather.com/api/',
               'Access-Control-Allow-Methods': 'GET'
        }
      })
      const data = await response.json()
      setLocation(data[0].title)
      return data[0].woeid
    } catch (error) {
      console.error("ErrorgetWoeid ",error.message)
    }
  }

  const formatDate = (date) => {
    let newDate = new Date(date).toDateString().split(' ')
    return `${ newDate[0] }, ${ newDate[2] } ${ newDate[1] }`
  }

  const getData = async(coords= placePosition, query= QUERYLATLOT ) => {
    setLoading(true)
    try { 
      const woeid =  await getWoeidData( coords, query)
      const response = await fetch(`${ CORS_PROXY_URL }${ URLAPI }location/${ woeid }/`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Origin': 'https://www.metaweather.com/api/',
          'Access-Control-Allow-Methods': 'GET'
        }
      })
      const info = await response.json()
      setData(info.consolidated_weather)
      setLoading(false)
    } catch (error) {
      setError(true)
      setCoords('')
      console.error("ErrorGetData ",error.message)
    }
  }

  const handleOnClick = () => {
    setActive(true)
  }

  const handleCancel = () => {
    setActive(false)
  }

  const handleSearch = () => {
    if(!coords.split('').includes(',') || !coords) {
      setIsWrong(true)
      return false
    }
    getData(coords)
    setActive(false)
    setIsWrong(false)
  }

  const handleOnChange = (e) => {
    setCoords(e.target.value)
  }

  const handleInitialData = () => {
    getData()
  }

  const handleSearchCountry = (e) => {
    getData(e.target.value, QUERY)
    setActive(false)
    setIsWrong(false)
  }

  const handleRestart = () => {
    getData()
    setError(false)
  }

  useEffect(() => {
    getData()// eslint-disable-next-line 
  },[])

  return (
    <div className={ styles.App }>
      {
        error 
          ? <Error handle={ handleRestart }/>
          : 
            <>
              <section className={ styles.Overview }>
                {
                  loading 
                    ? <Loader />
                    : 
                      <div className={ styles.Overview_Wrapper }>
                          <section className={ styles.Background }></section>
                          <section className={ styles.Input }>
                            <button type='button' onClick={ handleOnClick }>Search for places</button>
                            <div className={ styles.UserLocation } onClick={ handleInitialData }>
                              <img src={ imgLocationUser } alt="icon-user-location" title='User Location' />
                            </div>
                          </section>
                          <section className={ styles.Imagen }>
                            {
                              data.length > 0 &&
                                <img src={ imgWheathers[data[0].weather_state_abbr] } alt="icon-wheater" /> 
                            }
                          </section>
                          <section className={ styles.Content }>
                            <div className={ styles.Content_Title }>
                              {
                                data.length > 0 &&
                                <h1><span>{ data[0].the_temp.toString().charAt(0)  }</span><sub>{ data[0].the_temp.toString().charAt(1) }</sub> °C</h1>
                              }
                            </div>
                            <div className={ styles.Content_SubTitle }>
                              {
                                data.length > 0 &&
                                <h2>{ data[0].weather_state_name }</h2>
                              }
                            </div>
                            <div className={ styles.Content_Info }>
                              <div className={ styles.Date }>
                                <h3>Today</h3>
                                <h3>.</h3>
                                {
                                  data.length > 0 &&
                                  <h3>{ formatDate(data[0].applicable_date) }</h3>
                                }
                              </div>
                              <div className={ styles.Place }>
                                <div className={ styles.Place_Icon }>
                                  <img src={ imgIconLocation } alt="icon-location" />
                                </div>
                                {
                                  data.length > 0 &&
                                  <h3>{ location }</h3>
                                }
                              </div>
                            </div>
                          </section>
                      </div>
                }
              </section>
              <section className={ styles.Info }>
                {
                  loading 
                    ? <Loader />
                    : 
                      <>
                      <div className={ styles.Info_CardMain }>
                        {
                          data.length > 0 &&
                          <>
                              <CardWheater 
                                title='Tomorrow' 
                                imagen={ imgWheathers[data[0].weather_state_abbr] }
                                max={ parseInt(data[0].max_temp).toString() }
                                min= {  parseInt(data[0].min_temp).toString() }
                              />
                              <CardWheater 
                                title={ formatDate(data[1].applicable_date) } 
                                imagen={ imgWheathers[data[1].weather_state_abbr] }
                                max={ parseInt(data[1].max_temp).toString() }
                                min= {  parseInt(data[1].min_temp).toString() }
                              />
                              <CardWheater 
                                title={ formatDate(data[2].applicable_date) }
                                imagen={ imgWheathers[data[2].weather_state_abbr] }
                                max={ parseInt(data[2].max_temp).toString() }
                                min= {  parseInt(data[2].min_temp).toString() }
                              />
                              <CardWheater 
                                title={ formatDate(data[3].applicable_date) } 
                                imagen={ imgWheathers[data[3].weather_state_abbr] }
                                max={ parseInt(data[3].max_temp).toString() }
                                min= {  parseInt(data[3].min_temp).toString() }
                              />
                              <CardWheater 
                                title={ formatDate(data[4].applicable_date) } 
                                imagen={ imgWheathers[data[4].weather_state_abbr] }
                                max={ parseInt(data[4].max_temp).toString() }
                                min= {  parseInt(data[4].min_temp).toString() }
                              />
                          </>
                        }
                      </div>

                      <div className={ styles.Info_Title }>
                        <h2>Today’s Hightlights </h2>
                      </div>

                      <div className={ styles.Info_CardSecundary }>
                        {
                          data.length > 0 &&
                          <>
                            <CardSecundary title='Wind status' data={ parseInt(data[0].wind_speed).toString() } subTitle='mph'>
                              <div className={ styles.Info_CardSecundary__Icon}>
                                <img src={ imgArrow } alt="icon-arrow" />
                              </div>
                              <div>
                                <h4>WSV</h4>
                              </div>
                            </CardSecundary>
                            <CardSecundary title='Humidity' data={ parseInt(data[0].humidity).toString() } subTitle='%'>
                              <section className={ styles.Numbers }>
                                <h4>0</h4>
                                <h4>50</h4>
                                <h4>100</h4>
                              </section>
                              <progress className={ styles.Bar } value={  data[0].humidity } max='100' ></progress>
                              <section className={ styles.Percentage }>
                                <h4>%</h4>
                              </section>
                            </CardSecundary >
                            <CardSecundary title='Visibility' data={ parseInt(data[0].visibility).toString() } subTitle='miles'/>
                            <CardSecundary title='Air Pressure' data={ parseInt(data[0].air_pressure).toString() } subTitle='mb'/>
                          </>
                        }
                      </div>
                      <footer className={ styles.Info_Footer }>
                          <h4>Developed by HAHS</h4>
                      </footer>
                      </>
                }
              </section>
                <section className={ active ? `${ styles.Search } ${ styles.Search__active }` : styles.Search }>
                  <section className={ styles.Search_cancel }>
                    <button type='button' onClick={ handleCancel }>X</button>
                  </section>
                  <section className={ styles.Coords }>
                    <div className={ styles.Coords_Label }>
                      <label htmlFor="lat-long">Search: lat, long</label>
                    </div>
                    <div className={ styles.Coords_input }>
                      <img src={ imgSearch } alt="search-icon" />
                      <input id='lat-long' type="text" placeholder='5.8755834, -73.6688084' required onChange={ handleOnChange }/>
                    </div>
                    <div className={ styles.Coords_button }>
                      <input type="button" value='search' onClick={ handleSearch }/>
                    </div>
                    {
                      isWrong &&
                      <div className={ styles.Coords_alert }>
                          <h4>Please enter coordinates</h4>
                      </div>
                    }
                  </section>
                  <section className={ styles.OptionsList }>
                    <select name="countries" id="countries" onChange={ handleSearchCountry }>
                      <option value="Bogotá">Bogota</option>
                      <option value="Barcelona">Barcelona</option>
                      <option value="Brasília">Brasília</option >
                      <option value="New York">New York</option >
                      <option value="London">London</option>
                      <option value="Berlin">Berlin</option>
                      <option value="Tokyo">Tokyo</option >
                      <option value="Beijing">Beijing</option>
                      <option value="Sydney">Sydney</option >
                      <option value="Moscow">Moscow</option>
                      <option value="Cairo">Cairo</option>
                    </select>
                  </section>
                </section>
            </>
      }
    </div>
  );
}

export default App;
