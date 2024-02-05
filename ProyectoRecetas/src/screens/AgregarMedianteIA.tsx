import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import NavBarTop from '../components/NavBarTop'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import NavBarBottom from '../components/NavBarBottom'

type Props = {
    navigation: any
}

const AgregarMedianteIA = ({navigation}: Props) => {
    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <TextInput style={{width: 300, height: 100, backgroundColor: "white"}}/>
                <TouchableOpacity style={{alignItems: 'center', marginTop: 30}}><Text style={{color: "black", backgroundColor: "#ffa492", padding: 10}}>Preguntar</Text></TouchableOpacity>
            </View>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default AgregarMedianteIA

const styles = StyleSheet.create({})