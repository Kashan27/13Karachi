import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from 'react-native'
import { useEffect, useState, memo, useCallback } from 'react';
import axios from 'axios';
import ip from '../ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColor from '../themeColor/themeColor';
import { List } from 'react-native-paper';
import Header from '../Components/Header/Header';
import { useIsFocused } from "@react-navigation/native";
import fetchUserData from '../fetchs/fetchUserData';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Dialog, Portal } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useQuery } from 'react-query';








// const MenuComp = ({ visible }) => {
//   return (

//   )
// }





const Profile = ({ navigation }) => {
    const isFocused = useIsFocused();
    let { data, isLoading, refetch } = useQuery('userData', fetchUserData)
    let [user, setUser] = useState(true)
    const [visible, setVisible] = useState(false);
    const hideDialog = () => setVisible(false);







    useEffect(() => {
        refetch()
        console.log("refetch")
    }, [isFocused , user])


    let handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.navigate('home')
        } catch (err) {
            console.log(err.message)
        }
    }


    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            // console.log(res[0],"res")
            const data = new FormData();
            // data.append('name', 'avatar');
            //   setImgName(res[0].name)
            data.append('file', {
                uri: res[0].uri,
                type: res[0].type,
                name: res[0].name
            });
            data.append('upload_preset', '13karachi')
            data.append('cloud_name', 'dhcxv86kr')

            // console.log(data, "data")
            fetch('https://api.cloudinary.com/v1_1/dhcxv86kr/image/upload', {
                method: 'POST',
                body: data
            }).then(res => res.json())
                .then(data => {
                    // setSingleFile(data)
                    updateProfileImage(data.url)
                    console.log(data.url)
                    // setInput({...input , img:data.url})
                })


        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                console.log('Canceled from single doc picker');
            } else {
                //For Unknown Error
                console.log('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
        console.log(data)
    }


    let updateProfileImage = (img) => {
            let _id = data._id
            let userData = data
            userData.img = img
        axios.patch(`${ip}/api/profileupdate/${_id}`, {...userData})
            .then((res) => {
                console.log(res.data , "response")
                try {
                    AsyncStorage.setItem("user", JSON.stringify({ data: { ...userData } }))
                    setUser(!user)
                } catch (err) {
                    console.log(err)
                }
            })
            .catch((err) => {
                console.log(err.message, "This is handleEditUser Catch Console")
            })
    }






    return (
        <View>
            <Header style={{ zIndex: 1 }} navigation={navigation} width={"80%"} showMore={true} title="App" />
            <View style={styles.header}>
                <View style={styles.profileImage}>
                    <ImageBackground
                        imageStyle={{ borderRadius: 100 }}

                        style={styles.image}
                        source={{ uri: (data && data.img) }}>

                        <Pressable style={{ width: 30, marginTop: 50, marginLeft: 90 }} onPress={selectOneFile}>
                            <Ionicons color={themeColor} size={30} name='pencil-outline' />
                        </Pressable>

                        {/* <Text>adjsdjlkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text> */}
                    </ImageBackground>
                </View>

            </View>
            <Text style={styles.name}>
                {data && data.name}
            </Text>
            <Text style={styles.personalHeading}>
                Personal
            </Text>

            <List.Item
                disabled={true}
                title="Email"
                description={data && data.email}
                left={props => <List.Icon {...props} icon="email" />}
            />
            <List.Item
                title="Phone"
                description={data && data.contact}
                left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
                title="Address"
                description={data && data.address}
                left={props => <List.Icon {...props} icon="map-marker" />}
            />
            <List.Item
                title="Role"
                description="User"
                left={props => <List.Icon {...props} icon="account" />}
            />

            <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>

                <Button
                    onPress={e => { navigation.navigate('editprofile', data) }}
                    icon={"pencil-outline"}
                    mode='filled'
                    textColor='white'
                    buttonColor={themeColor}
                    style={styles.button}

                >Edit Profile</Button>
                <Button
                    icon={"account-arrow-left"}
                    mode='contained'
                    textColor={themeColor}
                    buttonColor="#c3f7f5"
                    style={styles.button}
                    onPress={e => { handleLogOut() }}

                >LogOut</Button>
            </View>
            <Button
                icon={"format-list-group"}
                mode='filled'
                textColor='white'
                buttonColor={themeColor}
                style={styles.button}
                onPress={e => { navigation.navigate('orderstatus') }}
            >My Orders</Button>


            {/* Dialog */}

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Actions>
                    <Button onPress={() => console.log('Cancel')}>Cancel</Button>
                    <Button onPress={() => console.log('Ok')}>Ok</Button>
                </Dialog.Actions>
            </Dialog>

        </View>
    )
}

export default memo(Profile)

const styles = StyleSheet.create({

    header: {
        backgroundColor: "lightgrey",
        height: 150,
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 100,
        backgroundColor: "grey",
        position: "absolute",
        top: 95,
        left: 10,
    },
    editIcon: {
        position: "absolute",
        backgroundColor: "blue",
        width: 20,
        height: 50,
        top: 70,
        left: 90
    },
    name: {
        color: themeColor,
        fontSize: 20,
        textAlign: "center",
        marginLeft: 80,
        fontWeight: "bold",
        marginTop: 20,
        padding: 5
    },
    personalHeading: {
        fontSize: 20,
        padding: 40,
        paddingBottom: 10,
        fontWeight: "bold",
        color: "grey"
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 100,
    },
    button: {
        borderRadius: 10,
        width: "35%",
        margin: 25,
        marginTop: 10,
        marginBottom: 10
    }

})