import { useContext, useState  } from 'react'
//ESTILOS
import styles from '../styles/components/SearchContent.module.css'
//IMAGE
import imgSearch from '../assets/lupa.svg'
//CONTEXT
import { AppContext } from '../context/AppContext'
//COMPONENT
import ItemSearch from '../components/ItemSearch'
//UTILS
import { getWoeidData } from '../utils/woeidData'

const SearchContent = () => {
    const { filters, setFilters, setCoords, setActive, coords, setError } = useContext(AppContext)
    const [ isWrong,  setIsWrong ] = useState(false)
    const QUERY = 'query'


    const handleOnChange = (e) => {
        setCoords(e.target.value)
    }

    const handleCancel = () => {
        setActive(false)
    }

    const handleSearch = async() => {
        if(!coords) {
            setIsWrong(true)
            return false
        }
        try {
            const data = await getWoeidData(coords, QUERY)
            setFilters(data)
            setIsWrong(false)
            
        } catch (error) {
            setError(true)
        }
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
                        <h4>Please, enter a city name</h4>
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