import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react';
import { Input, Text, Autocomplete, AutocompleteItem, CheckBox, Radio, RadioGroup } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ip from '../ip';

const CheckOut = ({ navigation, route }) => {
    // console.log(subTotal)
    const { subTotal } = route.params
    const [loading , setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [activeChecked, setActiveChecked] = useState(false);
    const useCheckboxState = (initialCheck = false) => {
        const [checked, setChecked] = React.useState(initialCheck);
        return { checked, onChange: setChecked };
    };
    const basicCheckboxState = useCheckboxState();
    // end of checkboxes


    // --------------------------states---------------------------------- //
    let [orderDetails, setOrderDetails] = useState({
        email: "",
        orderContact: "",
        shippingOne: "",
        shippingTwo: "",

    })



    const handleInputs = (property, value) => {
        console.log(orderDetails)
        setOrderDetails({ ...orderDetails, [property]: value })
    }


    const handleConfirmOrder = async () => {
        let { email, orderContact, shippingOne, shippingTwo } = orderDetails
        try {
            let cartItems = await AsyncStorage.getItem("cart")
            let parseCart = JSON.parse(cartItems)
            // console.log(parseCart)
            const getdate = new Date().toLocaleString()
            let obj = {
                userEmail: email,
                orderContact: orderContact,
                hotelDate: getdate,
                paymentstatus: "Pending",
                shippingOne: shippingOne,
                shippingTwo: shippingTwo,
                orderCity: "Karachi",
                orderState: "Sindh",
                totalBillAmount: subTotal,
                deliveryChargesOne: 100,
                deliveryChargesTwo: 0,
                totalNetAmount: subTotal + 100,
                cartItems: parseCart.map((productlist) => (
                    {
                        _id: productlist._id,
                        cartQuantity: productlist.qty,
                        hotelname: productlist.hotelname,
                        imageURL: productlist.imageURL,
                        productName: productlist.productName,
                        productPrice: productlist.productPrice,
                        qty: productlist.qty,
                        userEmail: productlist.userEmail,
                        prodarea: productlist.prodarea,
                        prodmarketname: productlist.prodmarketname,
                        productTitle: productlist.productTitle,
                        productWeight: productlist.productWeight,
                        category: productlist.category,
                        productSize: productlist.itemSize,
                        productColor: productlist.itemSize,
                    }



                ))

            }

            console.log(selectedIndex, "active checked")
            if (true) {
            // if (email || orderContact || shippingOne || shippingTwo) {
                if (selectedIndex) {
                    console.log(basicCheckboxState, "basicCheckboxState")
                    if (basicCheckboxState.checked) {
                        setLoading(true)
                        console.log(obj)
                        // axios.post(`http://192.168.1.106:9000/api/bookingpostdata`,{...obj})
                        axios.post(`http://${ip}/api/bookingpostdata`,{...obj})
                        .then((res)=>{
                            console.log(res.data,"rreess")
                            if(res.data.success){
                                setLoading(false)
                                navigation.navigate("successorder")
                            }
                        })
                        .catch((err)=>{
                            setLoading(false)
                            console.log(err.message)
                            alert("Please try again in few seconds")
                            // alert(err.message)
                        })
                    } else {
                        alert("Accept Terms and conditions")
                    }
                } else {
                    alert("select payment method")
                }
            } else {
                alert("please fill all the details")
            }
            // console.log(obj)

        } catch (err) {
            console.log(err)
        }
    }




















    // ----------------------------------------------RNDER----------------------------------- ---------
    return (
        <View>
            {/* Heading */}
            <Text style={styles.heading}>Checkout</Text>


            {/* Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.subDetailContainer}>
                    <Text category="h5">Email</Text>
                    <Input
                        onChangeText={e => { handleInputs("email", e) }}
                        style={styles.input}
                        size='medium'
                        placeholder='Email'
                    />
                </View>
                <View style={styles.subDetailContainer}>
                    <Text category="h5">Contact</Text>
                    <Input
                        onChangeText={e => { handleInputs("orderContact", e) }}

                        style={styles.input}
                        size='medium'
                        placeholder='contact'
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.subDetailContainer}>
                    <Text category="h5">Address 1</Text>
                    <Input
                        onChangeText={e => { handleInputs("shippingOne", e) }}

                        multiline={true}
                        style={styles.input}
                        size='medium'
                        placeholder='Address 1'
                    />
                </View>
                <View style={styles.subDetailContainer}>
                    <Text category="h5">Address 2</Text>
                    <Input
                        onChangeText={e => { handleInputs("shippingTwo", e) }}

                        multiline={true}
                        style={styles.input}
                        size='medium'
                        placeholder='Address 2'
                    />
                </View>
                <View style={{ width: "80%", marginTop: 10 }}>
                    <RadioGroup
                        selectedIndex={selectedIndex}
                        onChange={index => setSelectedIndex(index)}>


                        <Text category="h5">Payment Method</Text>
                        <Radio
                            style={styles.radio}
                            checked={activeChecked}
                            onChange={nextChecked => setActiveChecked(nextChecked)}>
                            Cash On Delivery
                        </Radio>
                        <Radio
                            style={styles.radio}
                            disabled={true}>
                            Card
                        </Radio>
                    </RadioGroup>
                </View>
                <View style={{ width: "80%", marginTop: 30 }}>
                    <CheckBox
                        style={styles.checkbox}
                        status='basic'
                        {...basicCheckboxState}>
                        Terms and Conditions
                    </CheckBox>

                    <Button
                        loading={loading}
                        style={styles.button}
                        // icon="cart"
                        mode="contained"
                        onPress={() => { handleConfirmOrder() }}
                    >
                        Confirm Order
                    </Button>
                </View>
            </View>


        </View>
    )
}

export default CheckOut

const styles = StyleSheet.create({
    button: {
        width: "50%",
        marginTop: 20
    },
    detailsContainer: {
        alignItems: "center",
        display: "flex",
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 8,
        textAlign: 'center'
    },
    input: {
        // flex: 1,
        width: "85%",
        fontSize: 18,
    },
    subDetailContainer: {
        marginTop: 20,
        // width:"100%"
    },
    radio: {
        margin: 4,
    }

})