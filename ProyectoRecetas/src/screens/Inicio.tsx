import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    navigation: any
}

const Inicio = ({navigation}: Props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
			<View>
				<Text style={{ color: 'black', fontSize: 25, marginBottom: 20, marginTop: "20%" }}>Hola</Text>
			</View>
			<View style={{marginTop: "90%", alignItems: 'center'}}>
				<TouchableOpacity onPress={() => navigation.navigate("Login")} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10, margin: 10, width: 100}}><Text style={{ color: 'black'}}>Ir al Login</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{backgroundColor: "#ffa492", padding: 10, borderRadius: 10, margin: 10, width: 100}}><Text style={{ color: 'black'}}>Ir al Register</Text></TouchableOpacity>
			</View>
		</View>
    )
}

export default Inicio

const styles = StyleSheet.create({})