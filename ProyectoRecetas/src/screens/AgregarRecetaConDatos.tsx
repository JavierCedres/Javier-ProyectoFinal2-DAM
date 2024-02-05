import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavBarTop from '../components/NavBarTop'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import NavBarBottom from '../components/NavBarBottom'

type Props = {
    navigation: any
}

const AgregarRecetaConDatos = ({navigation}: Props) => {
    return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce"}}>
            <NavBarTop navigation={navigation}/>
            <ScrollView>
                <View style={{backgroundColor: "white", width: 300, height: 501, margin: 50}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
                        <Image 
                            source={{uri: "https://yhoyquecomemos.com/wp-content/uploads/2016/07/quesillo-receta-1.jpg"}}
                            style={{width: 100, height: 100}}
                        />
                        <View style={{flexDirection: 'column', marginLeft: 20, width: 150}}>
                            <Text style={{color: "black"}}>Título:</Text>
                            <TextInput style={{backgroundColor: "white", height: 30, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140}}/>
                        </View>
                    </View>
                    <View style={{margin: 20, flex: 1}}>
                        <Text style={{color: "black"}}>Descripción:</Text>
                        <TextInput style={{backgroundColor: "white", height: 100, minWidth: 260, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140}}/>                
                    </View>
                    <View style={{margin: 20, flex: 1}}>
                        <Text style={{color: "black"}}>Receta:</Text>
                        <TextInput style={{backgroundColor: "white", height: 100, minWidth: 260, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140}}/>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 15}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Main")}><Text style={{color: "black", backgroundColor: "#ffa492", padding: 5}}>Crear</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <NavBarBottom navigation={navigation}/>
        </View>
    )
}

export default AgregarRecetaConDatos

const styles = StyleSheet.create({})