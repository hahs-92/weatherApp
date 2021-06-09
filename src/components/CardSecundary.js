//ESTILOS
import styles from '../styles/components/CardSecundary.module.css'

const CardSecundary = ({ children, title, data, subTitle }) => {
    return(
        <article className={ styles.CardSecundary }>
            <section className={ styles.Title }>
                <h4>{ title }</h4>
            </section>

            <section className={ styles.Data }>
               <h2><strong>{ data }</strong>{ subTitle }</h2>
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