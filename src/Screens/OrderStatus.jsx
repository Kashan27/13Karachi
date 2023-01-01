import * as React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import ProcessingScreen from './OrderStatus/Processing';
import ShippedScreeen from './OrderStatus/Shipped';
import themeColor from '../themeColor/themeColor'
import Header from '../Components/Header/Header';

import ip from '../ip'
import axios from 'axios'





const OrderStatus = ({navigation}) => {
  
  
  
  const [statusDetails, setStatusDetails] = useState()
  const [orders , setOrders] = useState()
  const layout = useWindowDimensions();
  const Processing = () => <ProcessingScreen navigation={navigation} data={orders} />
  const Shipped = () => <ShippedScreeen navigation={navigation} data={orders} />
  
  
  
  const renderScene = SceneMap({
    first: Processing,
    second: Shipped,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Processing' },
    { key: 'second', title: 'Shipped' },
  ]);



let handleGetData = async () => {
  // axios.patch(`https://${ip}/api/ordersupdate/6365861747d99219e9be2dd1`)
  let email = await AsyncStorage.getItem('user')
  email = JSON.parse(email).data.email
  axios.get(`${ip}/api/allbookbyemail/${email}`)
    .then((res) => {
      setOrders(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    })

}


  useEffect(() => {
    handleGetData()
  }, []);


  let renderTabBar = (props) => {
    return (
      <>
                    {/* <Header style={{ zIndex: 1 }} navigation={navigation}  width={"80%"} showMore={true} title="App" /> */}
      <View style={styles.tabBarContainer}>

        <TabBar
        gap={5}
          style={styles.tabBar}
          renderLabel={({ route, focused, color }) => {
            if(focused) {
              return(
                <Text
                style={{widdh:"100%" , color:"white" , fontWeight:"bold" , fontSize:17 , padding:0}}
                >
                {route.title}
              </Text>
            )}else{
              return(
                <Text
                  style={{width:"100%" , color:"grey" , fontWeight:"bold" , fontSize:17 , padding:0}}
                >
                  {route.title}
                </Text>
              )
            }
          }
          }
          // indicatorContainerStyle={{width: 150}}
          indicatorStyle={styles.indicator}
          {...props}
          pressColor={"White"}
          /></View>
          </>
    )
  }





  return (
    <>

                <Header style={{ zIndex: 1 }} navigation={navigation}width={"80%"} showMore={true} title="App" />
      <Text style={styles.heading}>My Orders</Text>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
      />
    </>
  )
}

export default OrderStatus

const styles = StyleSheet.create({
 
  heading: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold"
  },
  indicator: {
    backgroundColor: themeColor,
    height: "100%",
    borderRadius: 50,
    // width:"40%",
    

  },
  tabBarContainer: {
    display: "flex",
    
  },
  tabBar: {
    backgroundColor: "#f2f2f2",
    width: "100%"
  }
})