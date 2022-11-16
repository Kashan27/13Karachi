import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { SliderBox } from "react-native-image-slider-box";
import { ImageSlider } from "react-native-image-slider-banner";



const Slider = ({images}) => {
  return (
    <ImageSlider 
    data={images}
    autoPlay={true}
    onItemChanged={(item) => console.log("item", item)}
    closeIconColor="#fff"
/>
  )
}

export default Slider

const styles = StyleSheet.create({})