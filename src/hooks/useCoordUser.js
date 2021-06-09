import { useState } from 'react'

export const useCoordUser = async() => {
    const [ coordUser, setCoordUser ] = useState('')

    const positionUser = ( position) => {
        let placePosition = [ position.coords.latitude, position.coords.longitude] 
        setCoordUser(placePosition)
    }
    
    const errorNavigator = (error) => {
        console.error(error.message)
    }
    
    navigator.geolocation.getCurrentPosition(positionUser, errorNavigator,{ enableHighAccuracy: true } )

    return coordUser
}
