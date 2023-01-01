import { View, Text } from 'react-native'
import axios from 'axios'
import React from 'react'
import ip from '../ip'

const fetchingCategories = async () => {

   

   const {data} = await axios.get(`${ip}/api/allgetcategory`)
   return data


}

export default fetchingCategories;