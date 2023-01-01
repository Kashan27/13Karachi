import { Slide, Alert,  } from 'native-base';
import { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NetworkStatus = (isOffline) => {
    const [isOpenTop, setIsOpenTop] = useState(true);
        console.log(isOffline)
  return (
    // <Box h="32" w="300">
      <Slide in={isOffline.status} placement="top">
        <Alert justifyContent="center" status="error">
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            No Internet Connection
          </Text>
        </Alert>
      </Slide>
    // </Box>
  )
}

export default NetworkStatus

const styles = StyleSheet.create({})