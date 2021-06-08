//ESTILOS
import styles from '../styles/components/CardWheater.module.css'

import img from '../assets/HeavyRain.png'

const CardWheater = () => {
    return(
        <article className={ styles.CardWheater }>
            <div className={ styles.Title }>
                <h4>Tomorrow</h4>
            </div>
            <div className={ styles.Imagen }>
                <img src={ img } alt="img" />
            </div>
            <div className={ styles.Temperature }>
                <h4>16°C</h4>
                <h4 className={ styles.LastChildren }>14°C</h4>
            </div>
        </article>
    )
}

export default CardWheater