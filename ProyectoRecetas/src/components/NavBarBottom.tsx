import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    navigation: any
}

const NavBarBottom = ({navigation}: Props) => {
    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: 'space-evenly', height: 60, backgroundColor: "#d0deb8"}}>
            <View style={{flex: 1, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <Image 
                        source={{uri: "https://cdn-icons-png.flaticon.com/512/102/102061.png"}}
                        style={{width: 40, height: 40}}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Favoritos")}>
                    <Image 
                        source={{uri: "https://cdn-icons-png.flaticon.com/512/130/130193.png"}}
                        style={{width: 40, height: 40}}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("EleccionAgregar")}>
                    <Image 
                        source={{uri: "https://cdn.icon-icons.com/icons2/2368/PNG/512/plus_add_insert_icon_143709.png"}}
                        style={{width: 40, height: 40}}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Ajustes")}>
                    <Image 
                        source={{uri: "https://cdn-icons-png.flaticon.com/512/61/61094.png"}}
                        style={{width: 40, height: 40}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavBarBottom

const styles = StyleSheet.create({})