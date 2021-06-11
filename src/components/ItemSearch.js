import { useContext } from 'react'
//ESTILOS
import styles from '../styles/components/ItemSearch.module.css'
//IMAGES
import imgArrow from '../assets/right-arrow.svg'
//CONTEXT
import { AppContext } from '../context/AppContext'

const ItemSearch = (props) => {
    const { setActive, setFilters, setLocation, setLoading, setCoords, setError,setData } = useContext(AppContext)
    const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=' 
    const URLAPI = "https://www.metaweather.com/api/"

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

    const handleGetData = (query) => { //ESTO SE PASA COMO PROPS
        const COUNTRYWEOID = query.target.dataset.woeid || query.target.parentElement.dataset.woeid || query.target.parentElement.parentElement.dataset.woeid
        const COUNTRY = query.target.innerText  || query.target.parentElement.innerText || query.target.parentElement.parentElement.innerText
        getData(COUNTRYWEOID)
        setActive(false)
        setFilters([])
        setLocation(COUNTRY)
    }
    return(
        <article className={ styles.ItemSearch } data-woeid={ props.data } onClick={ handleGetData }>
            <section className={ styles.Title }>
                <h4>{ props.title }</h4>
            </section>
            <section className={ styles.Icon }>
                <img src={ imgArrow } alt="arrow-icon" />
            </section>
        </article>
    )
}

export default ItemSearch