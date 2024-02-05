import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'

type Props = {
    navigation: any
}

const Ajustes = ({navigation}: Props) => {
    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: "black", backgroundColor: "#ffa492", padding: 10}}>No se</Text>
            </View>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default Ajustes

const styles = StyleSheet.create({})