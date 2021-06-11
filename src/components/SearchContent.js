import { useContext, useState  } from 'react'
//ESTILOS
import styles from '../styles/components/SearchContent.module.css'
//IMAGE
import imgSearch from '../assets/lupa.svg'
//CONTEXT
import { AppContext } from '../context/AppContext'
//COMPONENT
import ItemSearch from '../components/ItemSearch'

const SearchContent = () => {
    const { filters, setFilters, setCoords, setActive, coords } = useContext(AppContext)
    const [ isWrong,  setIsWrong ] = useState(false)
    const QUERYLATLOT = 'lattlong'
    const QUERY = 'query'
    // const CORSHEROKU = "https://cors-anywhere.herokuapp.com/"
    const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=' 
    const URLAPI = "https://www.metaweather.com/api/"

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

    const handleOnChange = (e) => {
        setCoords(e.target.value)
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

    return(
        <>
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
                        <ItemSearch key={ item.woeid } title={ item.title } data={ item.woeid } />
                    ))
                }
            </section>
        </>
    )
}

export default SearchContent