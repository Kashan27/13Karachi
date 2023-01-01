import axios from 'axios'
import ip from '../ip'

const fetchingPost = async () => {

   const {data} = await axios.get(`${ip}/api/allpostdata`)
   return data


}

export default fetchingPost