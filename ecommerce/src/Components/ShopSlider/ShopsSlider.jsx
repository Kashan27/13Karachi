import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { useState } from 'react';
import themeColor from '../../themeColor/themeColor';

const ShopsSlider = ({name , markets , updMarket }) => {
    let [mode , setMode] =  useState("contained-tonal")
    return (
        <View
        style={styles.container}>
            <Button 
            icon={"account-arrow-left"}
            mode='contained'
            textColor={themeColor}
            buttonColor="#c3f7f5"
            style={{height:40 , margin:0}}
            // onPressIn={e=>{setMode("contained")}}
            // onPressOut={e=>{setMode("contained-tonal")}}
            onPress={e=>{updMarket(name)}}
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