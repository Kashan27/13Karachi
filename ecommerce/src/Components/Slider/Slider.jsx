import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { SliderBox } from "react-native-image-slider-box";
import { useState , useEffect } from 'react';
import axios from 'axios';
import { ImageSlider } from "react-native-image-slider-banner";
import ip from '../../ip';



const Slider = ({ images }) => {

  let [carousel , setCarousel] = useState([])

  useEffect(() => {


    axios.get(`https://${ip}/api/allgetcarousel`)
      .then(res => {
        let carousels = []
        res.data.forEach(item => {
          let obj = {img:item.imageURL[0]}
          carousels.push(obj)

        })
        setCarousel(carousels)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  return (
    <ImageSlider
      data={carousel}
      // autoPlay={true}
      closeIconColor="black"
    />
  )
}

export default Slider

const styles = StyleSheet.create({})