import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    navigation: any
}

const NavBarTop = ({navigation}: Props) => {
    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', minHeight: "12%", width: "100%", backgroundColor: "#d0deb8"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                <Image 
                    source={{uri: "https://static.wikia.nocookie.net/typemoon/images/f/fb/AssassinKingHassanStage2.png/revision/latest?cb=20201216003738"}}
                    style={{width: 60, height: 60, borderRadius: 100, marginTop: 10, marginLeft: 10, marginBottom: 10}}
                />
            </TouchableOpacity>
            <Text style={{color: "black", fontSize: 26}}>Nombre</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Amigos")} style={{backgroundColor: "#ffa492", marginRight: 10, padding: 5}}><Text style={{color: "black"}}>Amigos</Text></TouchableOpacity>
        </View>
    )
}

export default NavBarTop

const styles = StyleSheet.create({})