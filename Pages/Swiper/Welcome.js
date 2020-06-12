import React, { Component } from 'react'
import { Text, View, StyleSheet,Button, ImageBackground, Image, Dimensions, StatusBar, TextInput,TouchableOpacity } from 'react-native'
import DeviceStorage from './../../Navigator/DeviceStorage'

import Swiper from 'react-native-swiper'
import Modal from "react-native-modal"
import MainTabNavigator from './../../Navigator/MainTabNavigator'
import Home from './../Home'

const SWIPER_URI = './../../assets/swiper/'
// const SWIPER_URI = './../../assets/swiper/swiper01.jpg'
const {width,height} = Dimensions.get('window')

export default class Welcome extends Component {

    state = { 
        showsPagination: true,
        isModalVisible: false,
        nombre: '',
        nickname: '',
    };
    
    _toggleModal = () => {
        
        this.setState({ 
            isModalVisible: !this.state.isModalVisible,
        });
    };
    
    _toggleCloseModal = () => {
        let len_nombre = this.state.nombre.length
        if (len_nombre === 0) {
            this.setState({ nickname: 'valenbicinito' })
        }
    //    console.log(this.state.nombre)
        this.setState({ 
            isModalVisible: !this.state.isModalVisible,
        });

        DeviceStorage.save("nickname",this.state.nombre);
        
       
    };

    constructor(props) {
        super(props);
        
        


      }
  
    _indexChanged = (index) => {
        
        if (index === 2) {
            this.setState({
                showsPagination: false
            });
        } 
    }
    render() {
        
        return (
            <>
            <StatusBar 
            translucent={true}
            hidden={true}
            animated={true} />

            <Swiper 
                style={styles.wrapper} 
                showsPagination={this.state.showsPagination}
                loop={false}
                showsButtons={false} 
                activeDotColor="#33CC99" 
                dotColor="#fff"
                onIndexChanged={index => this._indexChanged(index)}
            >
                <View>

                    <ImageBackground
                        style={styles.slide1}
                        source = {require(SWIPER_URI + 'swiper02.jpg')} 
                    >
                        <Text style={styles.text}>Rápido</Text>

                    </ImageBackground>
                    
                </View>
                <View>
                    <ImageBackground
                        style={styles.slide2}
                        source = {require(SWIPER_URI + 'swiper01.jpg')} 
                    >
                    <Text style={styles.text}>Rico</Text>
                    
                    </ImageBackground>
                </View>
                <View style={styles.endSlide}>

                    <Text style={styles.textSlide3}>Valencia Bici</Text>
                    
                    <Image 
                        style={styles.slide3}
                        source = {require(SWIPER_URI + 'swiper03.jpeg')} 
                        resizeMode="contain"
                    />

                    <TouchableOpacity style={styles.btnStyle}  onPress={this._toggleModal}>
                        <Text style={styles.btnText}>entrar un nombre</Text>
                    </TouchableOpacity>
                    
                </View>
            </Swiper>

            {/* hint info */}
            <Modal 
                isVisible={this.state.isModalVisible}
                backdropColor="#B4B3DB"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalContentTitle}>Hola 👋!</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="por favor ingrese el nombre"
                        value={this.state.nombre}
                        onChangeText={nombre => this.setState({ nombre: nombre })}
                        />
                    <Button onPress={
                        
                        () => {this._toggleCloseModal();this.props.navigation.navigate("SignedOut")}
                        // () => {this._toggleCloseModal;console.log(this.state.nombre)}
                        } title="Close" />
                </View>
            </Modal>
            </>
            
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    slide2: {
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    slide3: {
        width: width,
        height: height*0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    endSlide: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#33CC99',    
        fontSize: 120,
        fontWeight: 'bold',
        position: "absolute",
        top: 100,
    },
    textSlide3: {
        color: '#33CC99',
        fontSize: 30,
        fontWeight: 'bold',
    },
    btnStyle: {
        width: width * 0.8,
        height: 50,
        backgroundColor: '#33CC99',
        borderColor: '#33CC99',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 100
    },
    btnText: {
        color: '#fff',
        fontSize: 24
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    textInputStyle: { 
        height: 40,
        width: 180, 
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1 
    }
})


