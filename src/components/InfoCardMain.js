import { useContext } from 'react'
//ESTILOS
import styles from '../styles/components/InfoCardMain.module.css'
//CONTEXT
import { AppContext } from '../context/AppContext'
//UTILS
import { imgWheathers } from '../utils/weatherImages'
//COMPONENTES
import CardWeather from './CardWeather'

const InfoCardMain = () => {
    const { data } = useContext(AppContext)

    const formatDate = (date) => {
        let newDate = new Date(date).toDateString().split(' ')
        return `${ newDate[0] }, ${ newDate[2] } ${ newDate[1] }`
    }

    return(
        <div className={ styles.InfoCardMain }>
            {
            data.length > 0 &&
            <>
                <CardWeather 
                    title='Tomorrow' 
                    imagen={ imgWheathers[data[0].weather_state_abbr] }
                    max={ parseInt(data[0].max_temp).toString() }
                    min= {  parseInt(data[0].min_temp).toString() }
                />
                <CardWeather 
                    title={ formatDate(data[1].applicable_date) } 
                    imagen={ imgWheathers[data[1].weather_state_abbr] }
                    max={ parseInt(data[1].max_temp).toString() }
                    min= {  parseInt(data[1].min_temp).toString() }
                />
                <CardWeather 
                    title={ formatDate(data[2].applicable_date) }
                    imagen={ imgWheathers[data[2].weather_state_abbr] }
                    max={ parseInt(data[2].max_temp).toString() }
                    min= {  parseInt(data[2].min_temp).toString() }
                />
                <CardWeather 
                    title={ formatDate(data[3].applicable_date) } 
                    imagen={ imgWheathers[data[3].weather_state_abbr] }
                    max={ parseInt(data[3].max_temp).toString() }
                    min= {  parseInt(data[3].min_temp).toString() }
                />
                <CardWeather 
                    title={ formatDate(data[4].applicable_date) } 
                    imagen={ imgWheathers[data[4].weather_state_abbr] }
                    max={ parseInt(data[4].max_temp).toString() }
                    min= {  parseInt(data[4].min_temp).toString() }
                />
            </>
            }
        </div>
    )
}

export default InfoCardMain