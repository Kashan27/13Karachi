

import axios from 'axios'
import ip from '../ip'
import AsyncStorage from '@react-native-async-storage/async-storage'

const fetchUserData = async () => {
  
    
    
    try {
        let lsUserData = await AsyncStorage.getItem('user')
        let email = lsUserData ? JSON.parse(lsUserData).data.email : null
        console.log(email,"email")
        
        let {data} = await axios.get(`${ip}/api/postbyemailsignup/${email}`)
            console.log(data)
            return data[0]
    } catch (err) {
        console.log(err.message)
    }
}

export default fetchUserData





















