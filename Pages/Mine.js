import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import DeviceStorage from './../Navigator/DeviceStorage'
import {ShareImage} from './ShareImage'


const {width,height} = Dimensions.get('window')
const ICON_LINK = './../assets/icons/'

export default class Mine extends Component {


    static navigationOptions = {
        title: 'detail page',
        headerStyle : {},
       
      };
    
    state = {
        nickname: '',
        username: ''
    }
    
    componentDidMount() {
        DeviceStorage.get('nickname').then((nk)=>{
            
            this.setState({
                nickname: nk,
            });
        
        })
    }

    _editarNickname = () => {
        
        let username = this.state.username
        if (username.length !== 0) {
            DeviceStorage.update('nickname',username)
            this.setState({
                nickname: username,
            });
            Alert.alert(
                'Editar nombre',
                'Modificado con éxito'
            )
        }
        console.log(username)
    };

    render() {
        
        const nickname = this.state.nickname

        return (
            <View style={styles.mine}>
                <View style={styles.header}>
                    <View style={styles.circle}>
                        <Image
                            source={require(ICON_LINK + 'user.png')}
                            style={styles.headerImg}
                        />
                    </View>
                </View>
                <View style={styles.middle}>
                    <Text style={styles.middleText}>Editar nombre | {nickname}</Text>
                    
                    {/* <ShareImage style={styles.shareImage} /> */}
                    <View style={styles.line} />
                    <TextInput 
                        style={styles.topText}
                        placeholder='Nombre'
                        placeholderTextColor='#BFBFBF'
                        autoFocus={true}
                        keyboardType='default'
                        onChangeText={(username) => this.setState({username: username})}
                    />
                </View>
                <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._editarNickname}
                >
                    <Text style={styles.btnText}>Send</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mine: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        backgroundColor: "rgba(242, 242, 242, 1)",
        height: 0.3 * height,
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(228, 228, 228, 1)',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        backgroundColor: "rgba(242, 242, 242, 1)",
        borderColor: 'rgba(228, 228, 228, 1)',
        position: 'relative',
        top: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImg: {
        width: 60,
        height: 60
    },
    middle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    middleText: {
        fontWeight: "bold",
        fontSize: 20,
       
    },
    line: {
        borderBottomColor: 'rgba(0,0,0,.12)',
        borderBottomWidth: 1,
        width: 0.7 * width,
        paddingTop: 45
    },
    topText: {
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,.12)',
        height: 40,
        width: 0.9 * width,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 50,
        paddingLeft: 8,
        color: '#000',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        width: 0.9 * width,
        padding: 15,
        backgroundColor: 'rgba(51, 204, 153, 1)',
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 60
      },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    shareImage: {
        height: 30
    }
})
