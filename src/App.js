import { useState } from 'react'
//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'
//COMPONENTS
import CardSecundary from './components/CardSecundary'
import Loader from './components/Loader'
import Error from './components/Error'
import ItemSearch from './components/ItemSearch'
import Overview from './components/Overview'
import InfoCardMain from './components/InfoCardMain'
//IMAGE
import imgSearch from './assets/lupa.svg'
import imgArrow from './assets/arrow.svg'
//CONTEXT
import { AppContext } from './context/AppContext'


function App() {
  const [ active, setActive ] = useState(true)
  const [ data, setData ] = useState([])
  const [ location, setLocation ] = useState('')
  const [ coords, setCoords ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ isWrong,  setIsWrong ] = useState(false)
  const [ filters, setFilters ] = useState([])
  // const CORSHEROKU = "https://cors-anywhere.herokuapp.com/"
  const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=' 
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
      const response = await fetch(`${ CORS_PROXY_URL }${ URLAPI }location/search/?${ query }=${ coord }`)
      const data = await response.json()
      // setLocation(data[0].title)
      // return data[0].woeid
      setFilters(data)
    } catch (error) {
      console.error("ErrorgetWoeid ",error.message)
    }
  }

  const getData = async(query ) => {
    setLoading(true)
    try { 
      // const woeid =  await getWoeidData( coords, query)
      const response = await fetch(`${ CORS_PROXY_URL }${ URLAPI }location/${ query }`)
      const info = await response.json()
      setData(info.consolidated_weather)
      setLoading(false)
    } catch (error) {
      setError(true)
      setCoords('')
      console.error("ErrorGetData ",error.message)
    }
  }

  const handleCancel = () => {
    setActive(false)
  }

  const handleSearch = () => {
    if(!coords) {
      setIsWrong(true)
      return false
    }
    getWoeidData(coords, QUERY)
    setIsWrong(false)
  }

  const handleOnChange = (e) => {
    setCoords(e.target.value)
  }

  const handleGetData = (query) => { //ESTO SE PASA COMO PROPS
    const COUNTRYWEOID = query.target.dataset.woeid || query.target.parentElement.dataset.woeid || query.target.parentElement.parentElement.dataset.woeid
    const COUNTRY = query.target.innerText  || query.target.parentElement.innerText || query.target.parentElement.parentElement.innerText
    getData(COUNTRYWEOID)
    setActive(false)
    setFilters([])
    setLocation(COUNTRY)
  }

  const handleRestart = () => {
    getData()
    setError(false)
  }

  return (
    <AppContext.Provider value={ { data, setData, active, setActive, location, setLocation } }> 
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
                      : <Overview />
                  }
                </section>
                <section className={ styles.Info }>
                  {
                    loading 
                      ? <Loader />
                      : 
                        <>
                          <InfoCardMain />

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
                      <label htmlFor="lat-long">Search</label>
                    </div>
                    <div className={ styles.Coords_input }>
                      <img src={ imgSearch } alt="search-icon" />
                      <input id='lat-long' type="text" placeholder='ejm: Bogotá' required onChange={ handleOnChange }/>
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
                    {
                      filters.length > 0 &&
                        filters.map(item => (
                          <ItemSearch key={ item.woeid } title={ item.title } data={ item.woeid } handle={ handleGetData }/>
                        ))
                    }
                  </section>
                </section>
              </>
        }
      </div>
    </AppContext.Provider>
  );
}

export default App;
