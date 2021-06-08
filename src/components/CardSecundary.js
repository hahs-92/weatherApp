//ESTILOS
import styles from '../styles/components/CardSecundary.module.css'

const CardSecundary = ({ children }) => {
    return(
        <article className={ styles.CardSecundary }>
            <section className={ styles.Title }>
                <h4>Humidity</h4>
            </section>

            <section className={ styles.Data }>
               <h2><strong>6,4 </strong>miles</h2>
            </section>
            
            {
                children &&
                <section className={ styles.Children }>
                    { children }
                </section>
            }
        </article>
    )
}

export default CardSecundary