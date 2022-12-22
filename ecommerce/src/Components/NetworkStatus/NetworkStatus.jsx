import { Slide, Button, Alert, VStack, Heading, Divider, Center, NativeBaseProvider } from 'native-base';
import { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NetworkStatus = () => {
    const [isOpenTop, setIsOpenTop] = useState(true);

  return (
    // <Box h="32" w="300">
      <Slide in={isOpenTop} placement="top">
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