//ESTILOS
import styles from '../styles/components/CardWheater.module.css'

const CardWheater = (props) => {
    return(
        <article className={ styles.CardWheater }>        
            <div className={ styles.Title }>
                <h4>{ props.title }</h4>
            </div>
            <div className={ styles.Imagen }>
                <img src={ props.imagen } alt={ props.title } />
            </div>
            <div className={ styles.Temperature }>
                <h4>{ props.max }°C</h4>
                <h4 className={ styles.LastChildren }> { props.min }°C </h4>
            </div>     
        </article>
    )
}

export default CardWheater