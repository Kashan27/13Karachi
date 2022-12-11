import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import Markets from "../Screens/Markets";
import Products from "../Screens/Products";
import Home from "../Screens/Home";
import Cart from "../Screens/Cart";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import Header from "../Components/Header/Header";
import SingleProductScreen from "../Screens/SingleProductScreen";
import CheckOut from "../Screens/CheckOut";
import Shops from "../Screens/Shops";
import Ionicons from 'react-native-vector-icons/Ionicons';



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SuccessOrder from "../Screens/SuccessOrder";











const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();




const TabNav = () => {
    return (
        <Tab.Navigator
            barStyle={styles.bottomTabStyle}
            screenOptions={
                ({ route }) => ({
                    tabBarLabel: ({ focused }) => {
                        return <Text style={{ fontSize: 14, fontWeight: '600', color: "tomato" }}>{route.name}</Text>
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
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    // tabBarShowLabel: false,
                })}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="Area" component={Markets} />
            <Tab.Screen name="cart" component={Cart} />
            <Tab.Screen name="successorder" component={SuccessOrder} />
            {/* <Tab.Screen name="signup" component={Signup} /> */}
            {/* <Tab.Screen name="login" component={Login} /> */}
            {/* <Tab.Screen name="products" component={Products} />  */}
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
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="shops" component={Shops} />
                <Stack.Screen name="products" component={Products} />
                <Stack.Screen  name="header" component={Header} />
                <Stack.Screen  name="item" component={SingleProductScreen} />
                <Stack.Screen  name="checkout" component={CheckOut} />
                <Stack.Screen  name="successorder" component={SuccessOrder} />
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


