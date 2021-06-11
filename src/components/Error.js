//ESTILOS
import styles from '../styles/components/Error.module.css'
//IMAGES
import imgAlert from '../assets/advertencia.svg'

const Error = (props) => {
    return(
        <article className={ styles.Error }>
            <section className={ styles.Imagen }> 
                <img src={ imgAlert } alt="alert-icon" />
            </section>
            <section >
                <h3>Something is wrong¡¡</h3>
            </section>
            <section className={ styles.Home }>
                <button type='button' aria-label='button-home' onClick={ props.handle }>
                    Home
                </button>
            </section>
        </article>
    )
}

export default Error