import { useState } from 'react'
//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'
//IMAGES
import imgLightCloud  from './assets/LightCloud.png'
//COMPONENTS
import Loader from './components/Loader'
import Error from './components/Error'
import Overview from './components/Overview'
import InfoCardMain from './components/InfoCardMain'
import InfoCardSecundary from './components/InfoCardSecundary'
import SearchContent from './components/SearchContent'
//CONTEXT
import { AppContext } from './context/AppContext'


function App() {
  const [ active, setActive ] = useState(true)
  const [ data, setData ] = useState([])
  const [ location, setLocation ] = useState('')
  const [ coords, setCoords ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ filters, setFilters ] = useState([])
  // const CORSHEROKU = "https://cors-anywhere.herokuapp.com/"
  const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=' 
  const URLAPI = "https://www.metaweather.com/api/"

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

  return (
    <AppContext.Provider 
      value={ { data, setData, active, setActive, location, setLocation, filters, setFilters, coords, setCoords, error, setError, loading, setLoading } }> 
      <div className={ styles.App }>
        {
          error 
            ? <Error />
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
                    data.length === 0 && !loading &&
                      <section className={ styles.Info_Default }>
                        <h1>Weather App</h1>
                        <div className={ styles.Default_Imagen }>
                          <img src={ imgLightCloud } alt="icon-weather" />
                        </div>
                      </section>
                  }
                  {
                    loading 
                      ? <Loader />
                      : 
                        <>
                          <InfoCardMain />
                          {
                            data.length > 0 &&
                            <div className={ styles.Info_Title }>
                              <h2>Today’s Hightlights </h2>
                            </div>
                          }
                          <InfoCardSecundary />
                          <footer className={ styles.Info_Footer }>
                              <h4>Developed by HAHS</h4>
                          </footer>
                        </>
                  }
                </section>
                <section className={ active ? `${ styles.Search } ${ styles.Search__active }` : styles.Search }>
                  <SearchContent />
                </section>
              </>
        }
      </div>
    </AppContext.Provider>
  );
}

export default App;
