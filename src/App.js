//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'

//COMPONENTS
import CardWheater from './components/CardWheater'

function App() {
  
  const positionUser = ( position) => {
      let placePosition = [ position.coords.latitude, position.coords.longitude]
      // console.log(placePosition)
  }

  const errorNavigator = (error) => {
      console.error(error.message)
  }

  navigator.geolocation.getCurrentPosition(positionUser, errorNavigator,{ enableHighAccuracy: true })

  return (
    <div className={ styles.App }>

     <section className={ styles.Overview }>

     </section>

     <section className={ styles.Info }>
       <div className={ styles.Info_Wrapper }>
        <CardWheater />
        <CardWheater />
       </div>
     </section>

    </div>
  );
}

export default App;
