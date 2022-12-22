import * as React from 'react';
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import Markets from "../Screens/Markets";
import Products from "../Screens/Products";
import Home from "../Screens/Home";
import Cart from "../Screens/Cart";
import Header from "../Components/Header/Header";
import SingleProductScreen from "../Screens/SingleProductScreen";
import CheckOut from "../Screens/CheckOut";
import Shops from "../Screens/Shops";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ForgotPass from "../Screens/ForgotPass";
import NewPass from "../Screens/NewPass";
import Profile from "../Screens/Profile";
import CategoryWiseProducts from '../Screens/CategoryWiseProducuts';
import OrderStatus from "../Screens/OrderStatus"
import SuccessOrder from "../Screens/SuccessOrder";
import themeColor from "../themeColor/themeColor";
import EditProfile from '../Screens/EditProfile';
import Processing from '../Screens/OrderStatus/Processing';
import Shipped from '../Screens/OrderStatus/Shipped';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from "react-native";
import { StyleSheet } from "react-native";












const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();




const TabNav = () => {
    return (
        <Tab.Navigator
            barStyle={styles.bottomTabStyle}
            screenOptions={
                ({ route }) => ({
                    tabBarLabel: ({ focused }) => {
                        return <Text style={{ fontSize: 14, fontWeight: '600', color: "grey" }}>{route.name}</Text>
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Area') {
                            iconName = focused ? 'business' : 'business-outline';
                        } else if (route.name === 'cart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={28} color={color} />;
                    },
                    headerShown:false,
                    tabBarActiveTintColor: themeColor,
                    tabBarInactiveTintColor: 'gray',
                    // tabBarShowLabel: false,
                })}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="Area" component={Markets} />
            <Tab.Screen name="cart" component={Cart} />
            <Tab.Screen name="orderstatus" component={OrderStatus} />
            
        </Tab.Navigator >
    )
}


const StackNav = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#f4511e'
                    }, headerTintColor: '#fff',
                    
                }}
            >
                {/* <Stack.Screen name="markets" component={Markets} /> */}
                <Stack.Screen  name="test" component={TabNav} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="editprofile" component={EditProfile} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="forgotpass" component={ForgotPass} />
                <Stack.Screen name="newpass" component={NewPass} />
                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="shops" component={Shops} />
                <Stack.Screen name="products" component={Products} />
                <Stack.Screen name="categorywiseproducts" component={CategoryWiseProducts} />
                <Stack.Screen  name="header" component={Header} />
                <Stack.Screen  name="item" component={SingleProductScreen} />
                <Stack.Screen  name="checkout" component={CheckOut} />
                <Stack.Screen  name="successorder" component={SuccessOrder} />
                <Stack.Screen  name="processing" component={Processing} />
                <Stack.Screen  name="shipped" component={Shipped} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}












const Routes = () => {                                     ///////////////////////Starting of Component

    return (
        <>
            <StackNav />
            {/* <TabNav /> */}
        </>
    )

}



////                                     STYLIING

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});




export default Routes;


