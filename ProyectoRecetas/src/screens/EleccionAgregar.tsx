import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'

type Props = {
    navigation: any
}

const EleccionAgregar = ({navigation}: Props) => {
    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce" }}>
            <NavBarTop navigation={navigation} />
            <View style={{justifyContent: 'center', flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate("AgregarMedianteIA")} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10, margin: 10, width: 250}}><Text style={{ color: 'black', textAlign: 'center'}}>Crear Receta Mediante IA</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AgregarRecetaConDatos")} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10, margin: 10, width: 250}}><Text style={{ color: 'black', textAlign: 'center'}}>Crear Receta Con Datos Existentes</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AgregarReceta")} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10, margin: 10, width: 250}}><Text style={{ color: 'black', textAlign: 'center'}}>Crear Receta Desde 0</Text></TouchableOpacity>
                </View>
            </View>
            <NavBarBottom navigation={navigation} />
        </View>
    )
}

export default EleccionAgregar

const styles = StyleSheet.create({})