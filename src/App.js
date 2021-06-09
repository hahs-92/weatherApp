import { useEffect, useState } from 'react'

//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'

//COMPONENTS
import CardWheater from './components/CardWheater'
import CardSecundary from './components/CardSecundary'

//IMAGES
import imgCloudBackground from './assets/Cloud-background.png' //BG

import imgLocationUser from './assets/cliente.svg'
import imgIconLocation from './assets/pin.svg'
import imgArrow from './assets/arrow.svg'

//HOOKS
// import { useCoordUser } from './hooks/useCoordUser'

//UTILS
import { imgWheathers } from './utils/weatherImages'


function App() {
  let placePosition = ''
  const [ data, setData ] = useState([])
  const [ location, setLocation ] = useState('')
  // const CORSHEROKU = "https://cors-anywhere.herokuapp.com/"
  const URLAPI = "https://www.metaweather.com/api/"
  // const coordUser = useCoordUser()

  // __________________________GEOPOSITION_________________________________________
  const positionUser = ( position) => {
    placePosition = [ position.coords.latitude, position.coords.longitude] 
  }
  const errorNavigator = (error) => {
    console.error(error.message)
  }
  navigator.geolocation.getCurrentPosition(positionUser, errorNavigator,{ enableHighAccuracy: true } )
  // _______________________________________________________________________________________

  const getWoeidData = async(coord) => {
    try {  
      const response = await fetch(`https://www.metaweather.com/api/location/search/?lattlong=${ coord }`, {
        headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
              }
      })
      const data = await response.json()
      setLocation(data[0].title)
      return data[0].woeid
    } catch (error) {
      console.error("ErrorgetWoeid ",error.message)
    }
  }

  const getData = async() => {
    try { 
      const woeid =  await getWoeidData( placePosition)
      const response = await fetch(`${ URLAPI }location/${ woeid }/`)
      const info = await response.json()
      setData(info.consolidated_weather)
      console.log("DATA ",data)
      // console.log(data.consolidated_weather)
      // console.log("TEMPERATURA ", data.consolidated_weather[0].the_temp)
    } catch (error) {
      console.error("ErrorGetData ",error.message)
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div className={ styles.App }>
     <section className={ styles.Overview }>
       <div className={ styles.Overview_Wrapper }>
          <section className={ styles.Input }>
            <button>Search for places</button>
            <div className={ styles.UserLocation }>
              <img src={ imgLocationUser } alt="icon-user-location" />
            </div>
          </section>
          <section className={ styles.Imagen }>
            {
              data.length > 0 &&
                <img src={ imgWheathers[data[0].weather_state_abbr] } alt="image-wheater" /> 
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
                  <h3>{ data[0].applicable_date }</h3>
                  // <h3>Fri. 5 june </h3>
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

     </section>

     <section className={ styles.Info }>
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
              title={ data[1].applicable_date} 
              imagen={ imgWheathers[data[1].weather_state_abbr] }
              max={ parseInt(data[1].max_temp).toString() }
              min= {  parseInt(data[1].min_temp).toString() }
            />
            <CardWheater 
              title={ data[2].applicable_date }
              imagen={ imgWheathers[data[2].weather_state_abbr] }
              max={ parseInt(data[2].max_temp).toString() }
              min= {  parseInt(data[2].min_temp).toString() }
            />
            <CardWheater 
              title={ data[3].applicable_date} 
              imagen={ imgWheathers[data[3].weather_state_abbr] }
              max={ parseInt(data[3].max_temp).toString() }
              min= {  parseInt(data[3].min_temp).toString() }
            />
            <CardWheater 
              title={ data[4].applicable_date} 
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
              <section className={ styles.Bar }>
                <div></div>
              </section>
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
     </section>

    </div>
  );
}

export default App;
