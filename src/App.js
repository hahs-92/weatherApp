//ESTILOS
import './styles/Global.css'
import styles from './styles/App.module.css'

//COMPONENTS
import CardWheater from './components/CardWheater'
import CardSecundary from './components/CardSecundary'

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

       <div className={ styles.Info_CardSecundary }>
        <CardSecundary >
          <div>Icon</div>
          <div>
            <h4>WSV</h4>
          </div>
        </CardSecundary>
        <CardSecundary >
          <section className={ styles.Numbers }>
            <h4>0</h4>
            <h4>50</h4>
            <h4>100</h4>
          </section>
          <section className={ styles.Bar }>
            <div></div>
          </section>
          <section className={ styles.Percentage }>
            <h4>%</h4>
          </section>
        </CardSecundary>
        <CardSecundary />
        <CardSecundary />
        <CardSecundary />
       </div>

       <footer className={ styles.Info_Footer }>
          <h4>Developed by HAHS</h4>
       </footer>
     </section>

    </div>
  );
}

export default App;
