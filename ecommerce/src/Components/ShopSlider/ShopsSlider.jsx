import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { useState } from 'react';


const ShopsSlider = ({name , markets , updMarket }) => {
    let [mode , setMode] =  useState("contained-tonal")
    return (
        <View
        style={styles.container}>
            <Button 
            style={{height:40 , margin:0}}
            // onPressIn={e=>{setMode("contained")}}
            // onPressOut={e=>{setMode("contained-tonal")}}
            onPress={e=>{updMarket(name)}}
             mode={mode}
             >
                <Text>
                {name}
                </Text>
            </Button>
        </View>
    )
}

export default ShopsSlider

const styles = StyleSheet.create({
    container:{
        // height:100
        // backgroundColor:"blue",
        // paddingTop:8,
        paddingLeft:5
    }
})