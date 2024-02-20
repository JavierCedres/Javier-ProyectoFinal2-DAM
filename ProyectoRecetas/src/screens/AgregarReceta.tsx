import { Button, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NavBarTop from '../components/NavBarTop'
import NavBarBottom from '../components/NavBarBottom'
import axios from 'axios'
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';
import { openPhotoPicker } from 'react-native-permissions'
import { AppContext } from '../context/AppContextProvider'

type Props = {
    navigation: any
}

type RecetaPreview = {
    descripcion: string,
    imagen64: string,
    imagenNombre: string,
    nombre: string,
    receta: string,
    idUsuario: number
}

const AgregarReceta = ({ navigation }: Props) => {
    //const uri: string = "http://192.168.0.17:8080/api/v1/recetas";
    //const uri: string = "http://172.16.141.33:8080/api/v1/recetas";
    const uri: string = "http://192.168.0.20:8080/api/v1/recetas";
    const [formData, setFormData] = useState<RecetaPreview>({} as RecetaPreview);
    const [selectedImage, setSelectedImage] = useState<string>({} as string);
    const { nickUsuario, idUsuario } = useContext(AppContext);

    function fillFormData(value: boolean | number | string, field: keyof RecetaPreview) {
        setFormData(
            {
                ...formData,
                [field]: value
            }
        );
    }

    function agregarReceta() {
        if (formData.nombre && formData.descripcion && formData.receta) {

            const receta: RecetaPreview = {
                descripcion: formData.descripcion,
                imagen64: selectedImage,
                imagenNombre: nickUsuario + formData.nombre,
                nombre: formData.nombre,
                receta: formData.receta,
                idUsuario: idUsuario
            }

            const axiosPost = async (rutaPalPost: string) => {
                try {
                    const response = await axios.post(rutaPalPost, receta);
                    console.log(response.data);
                    navigation.navigate("Perfil");
                } catch (error) {
                    console.log(error);
                }
            }

            axiosPost(uri);
        } else {
            ToastAndroid.show('Por favor rellene todos los campos', ToastAndroid.SHORT);
        }
    }

    const openImagePicker = () => {
        const options: any = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                let image64: string = response.assets?.[0].base64 + "" || response.assets?.[0].base64 + "";
                setSelectedImage(image64);
                console.log(image64);
            }
        });
    };

    const handleCameraLaunch = () => {
        const options: any = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorMessage) {
                console.log('Camera Error: ', response.errorMessage);
            } else {
                let image64: string = response.assets?.[0].base64 + "" || response.assets?.[0].base64 + "";
                setSelectedImage(image64);
                console.log(image64);
            }
        });
    }

    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', backgroundColor: "#fff4ce" }}>
            <NavBarTop navigation={navigation} />
            <ScrollView>
                <View style={{ backgroundColor: "white", width: 300, height: 545, margin: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                        <View style={{ borderWidth: 1 }}>
                            <Image
                                source={{ uri: "data:image/png;base64," + selectedImage }}
                                style={{ width: 120, height: 100 }}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ backgroundColor: "#ffa492", padding: 5, width: 60 }} onPress={openImagePicker}><Text style={{ color: "black" }}>Abrir Galería</Text></TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: "#ffa492", padding: 5, width: 60 }} onPress={handleCameraLaunch}><Text style={{ color: "black" }}>Abrir Cámara</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 20, width: 130 }}>
                            <Text style={{ color: "black" }}>Título:</Text>
                            <TextInput style={{ backgroundColor: "white", height: 30, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 120 }} onChangeText={(texto) => fillFormData(texto, "nombre")} />
                        </View>
                    </View>
                    <View style={{ margin: 20, flex: 1 }}>
                        <Text style={{ color: "black" }}>Descripción:</Text>
                        <TextInput style={{ backgroundColor: "white", height: 100, minWidth: 260, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140 }} onChangeText={(texto) => fillFormData(texto, "descripcion")} />
                    </View>
                    <View style={{ margin: 20, flex: 1 }}>
                        <Text style={{ color: "black" }}>Receta:</Text>
                        <TextInput style={{ backgroundColor: "white", height: 100, minWidth: 260, paddingVertical: 5, marginTop: 5, borderWidth: 1, width: 140 }} onChangeText={(texto) => fillFormData(texto, "receta")} />
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <TouchableOpacity onPress={() => agregarReceta()}><Text style={{ color: "black", backgroundColor: "#ffa492", padding: 5 }}>Crear</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <NavBarBottom navigation={navigation} />
        </View>
    )
}

export default AgregarReceta

const styles = StyleSheet.create({})