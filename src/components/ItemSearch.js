//ESTILOS
import styles from '../styles/components/ItemSearch.module.css'
//IMAGES
import imgArrow from '../assets/right-arrow.svg'

const ItemSearch = (props) => {
    return(
        <article className={ styles.ItemSearch } data-woeid={ props.data } onClick={ props.handle }>
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