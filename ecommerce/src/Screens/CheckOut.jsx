import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useState } from 'react';
// import { Input, Text, Autocomplete, AutocompleteItem, CheckBox, Radio, RadioGroup } from '@ui-kitten/components';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import themeColor from '../themeColor/themeColor';
import ip from '../ip';

const CheckOut = ({ navigation, route }) => {
    const [checked, setChecked] = useState(false);
    const [ts, setTS] = useState(false);
    const { subTotal } = route.params
    const [loading, setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [activeChecked, setActiveChecked] = useState(false);
    const useCheckboxState = (initialCheck = false) => {
        // const [checked, setChecked] = React.useState(initialCheck);
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
        setOrderDetails({ ...orderDetails, [property]: value })
    }


    const handleConfirmOrder = async () => {
        let { email, orderContact, shippingOne, shippingTwo } = orderDetails
        try {
            let cartItems = await AsyncStorage.getItem("cart")
            let parseCart = JSON.parse(cartItems)
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

            if (true) {
                // if (email || orderContact || shippingOne || shippingTwo) {
                if (selectedIndex) {
                    if (basicCheckboxState.checked) {
                        setLoading(true)
                        // axios.post(`http://192.168.1.106:9000/api/bookingpostdata`,{...obj})
                        axios.post(`https://${ip}/api/bookingpostdata`, { ...obj })
                            .then((res) => {
                                if (res.data.success) {
                                    setLoading(false)
                                    navigation.navigate("successorder")
                                }
                            })
                            .catch((err) => {
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
                    {/* <Text category="h5">Email</Text> */}
                    <TextInput
                        activeUnderlineColor={themeColor}
                        underLineColor="grey"
                        left={<TextInput.Icon icon="email" />}
                        label="Email"
                        // value={text}
                        icon='email'
                        style={styles.input}
                        onChangeText={e => { handleInputs("email", e) }}
                    />

                </View>
                <View style={styles.subDetailContainer}>
                    {/* <Text category="h5">Contact</Text> */}
                    <TextInput
                        activeUnderlineColor={themeColor}
                        underLineColor="grey"
                        left={<TextInput.Icon icon="phone" />}
                        label="Contact"
                        style={styles.input}
                        onChangeText={e => { handleInputs("contact", e) }}
                    />

                </View>
                <View style={styles.subDetailContainer}>
                    <TextInput
                        activeUnderlineColor={themeColor}
                        underLineColor="grey"
                        left={<TextInput.Icon icon="map-marker" />}
                        label="Address 1"
                        style={styles.input}
                        onChangeText={e => { handleInputs("shippingTwo", e) }}
                    />

                </View>
                <View style={styles.subDetailContainer}>
                    {/* <Text category="h5">Address 2</Text> */}
                    <TextInput
                        activeUnderlineColor={themeColor}
                        underLineColor="grey"
                        left={<TextInput.Icon icon="map-marker" />}
                        label="Address 2"
                        style={styles.input}
                        onChangeText={e => { handleInputs("shippingOne", e) }}
                    />

                </View>
                <View style={{ width: "80%", marginTop: 25 }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%" }}>

                        <Text style={{ marginTop: 8 }}>Cash On Delivery</Text>
                        <RadioButton
                            value="first"
                            status={checked === 'cod' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('cod')}
                            color={themeColor}
                        />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%" }}>
                        <Text style={{ marginTop: 8 }}>Bank Card</Text>
                        <RadioButton
                            disabled={true}
                            style={styles.radio}
                            value="second"
                            status={checked === 'card' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('card')}
                            color={themeColor}
                        />
                    </View>

                </View>
                <View style={{ width: "80%", marginTop: 30 }}>

                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%" }}>

                        <Checkbox
                            color={themeColor}
                            style={styles.checkbox}
                            status={ts ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setTS(!ts);
                            }}
                        />
                        <Text style={{ marginTop: 8 }}>Terms and Conditions</Text>
                    </View>

                    <Button
                        loading={loading}
                        style={styles.button}
                        buttonColor={themeColor}
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
        display: "flex",
        alignItems: "center",
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
        backgroundColor: "transparent"
    },
    subDetailContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: 20,
        width: "100%"
    },
    radio: {
        margin: 4,
        // width:"5%",
    }

})