import { useContext } from 'react'
//ESTILOS
import styles from '../styles/components/Overview.module.css'
//IMAGES
import imgLocationUser from '../assets/cliente.svg'
import imgIconLocation from '../assets/pin.svg'
import imgSun from '../assets/Clear.png'
//CONTEXT
import { AppContext } from '../context/AppContext'
//UTILS
import { imgWheathers } from '../utils/weatherImages'
import { getWoeidData } from '../utils/woeidData'
import { formatDate } from '../utils/formatDate'

const Overview = () => {
    const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=' 
    const URLAPI = "https://www.metaweather.com/api/"
    const { data, setActive, location,setLocation, setData, setLoading, setError, setCoords } = useContext(AppContext)

      // __________________________GEOPOSITION_________________________________________
    const positionUser = async( position) => {
        let placePosition =  [ position.coords.latitude, position.coords.longitude] 
        try {     
            const woeid = await getWoeidData( placePosition)
            getData(woeid[0].woeid)
            setLocation(woeid[0].title)
        } catch (error) {
            setError(true)
        }
    }
    const errorNavigator = (error) => {
        console.error(error.message)
    }
    // _______________________________________________________________________________________

    const getData = async(query ) => {
        setLoading(true)
        try { 
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

    const handleOnClick = () => {
        setActive(true)
    }

    const handleUserLocation = async() => {
        navigator.geolocation.getCurrentPosition(positionUser, errorNavigator,{ enableHighAccuracy: true } )
    }

    return(
        <article className={ styles.Overview_Wrapper }>

            <section className={ styles.Background }></section>
            <section className={ styles.Input }>
                <button type='button' onClick={ handleOnClick }>Search for places</button>
                <div className={ styles.UserLocation }  onClick={ handleUserLocation }>
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
                    {
                        data.length > 0 
                        ?
                        <>
                            <div className={ styles.Date }>
                                <h3>Today</h3>
                                <h3>.</h3>
                                <h3>{ formatDate(data[0].applicable_date) }</h3> 
                            </div>
                            <div className={ styles.Place }>
                                <div className={ styles.Place_Icon }>
                                    <img src={ imgIconLocation } alt="icon-location" />
                                </div>
                                <h3>{ location }</h3>
                            </div>
                        </>
                        : 
                        <section>
                            <div>
                                <img src={ imgSun } alt="icon-sun" />
                            </div>
                            <h2>Weather App</h2>
                        </section>
                    }
                </div>
            </section>
    </article>
    )
}

export default Overview