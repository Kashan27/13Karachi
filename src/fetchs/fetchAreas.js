import { View, Text } from 'react-native'
import axios from 'axios'
import React from 'react'
import ip from '../ip'

const fetchingAreas = async () => {
   const {data} = await axios.get(`${ip}/api/allgetarea`)
   return data

}

export default fetchingAreas;