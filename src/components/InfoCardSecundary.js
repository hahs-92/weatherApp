import { useContext } from 'react'
//ESTILOS
import styles from '../styles/components/InfoCardSecundary.module.css'
//CONTEXT
import { AppContext } from '../context/AppContext'
//IMAGES
import imgArrow from '../assets/arrow.svg'
//COMPONNETS
import CardSecundary from '../components/CardSecundary'

const InfoCardSecundary = () => {
    const { data } = useContext(AppContext)
    return(
        <div className={ styles.InfoCardSecundary }>
            {
            data.length > 0 &&
            <>
                <CardSecundary title='Wind status' data={ parseInt(data[0].wind_speed).toString() } subTitle='mph'>
                <div className={ styles.InfoCardSecundary__Icon}>
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
    )
}

export default InfoCardSecundary