//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'

//COMPONENTS
import CardWheater from './components/CardWheater'

import img from './assets/HeavyCloud.png'

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
       <div className={ styles.Overview_Wrapper }>
          <section className={ styles.Input }></section>

          <section className={ styles.Imagen }>
            <img src={ img } alt="image" />
          </section>
          
          <section className={ styles.Content }>
            <div className={ styles.Content_Title }>
              <h1><strong>15</strong>°C</h1>
            </div>
            <div className={ styles.Content_SubTitle }>
              <h2>Shower</h2>
            </div>
            <div className={ styles.Content_Info }>
              <div className={ styles.Date }>
                <h4>Today</h4>
                <h4>Friday 5 june </h4>
              </div>
              <div className={ styles.Place }>
                <h4>Helsinky</h4>
              </div>
            </div>
          </section>
       </div>

     </section>

     <section className={ styles.Info }>
       <div className={ styles.Info_CardMain }>
        <CardWheater />
        <CardWheater />
        <CardWheater />
        <CardWheater />
        <CardWheater />
       </div>

       <div className={ styles.Info_Title }>
         <h2>Today</h2>
       </div>

       <div>

       </div>
     </section>

    </div>
  );
}

export default App;
