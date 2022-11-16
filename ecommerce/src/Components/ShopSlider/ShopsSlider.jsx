import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { useState } from 'react';


const ShopsSlider = ({ markets , updMarket }) => {
    let [mode , setMode] =  useState("contained-tonal")
    return (
        <View>
            <Button 
            // onPressIn={e=>{setMode("contained")}}
            // onPressOut={e=>{setMode("contained-tonal")}}
            onPress={e=>{updMarket(markets.item.marketName)}}
             mode={mode}
             >

                {markets.item.marketName}
            </Button>
        </View>
    )
}

export default ShopsSlider

const styles = StyleSheet.create({})