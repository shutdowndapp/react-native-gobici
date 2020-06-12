import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    createSwitchNavigator,
    createAppContainer
  } from "react-navigation";

import DeviceStorage from './DeviceStorage'
import MainTabNavigator from './MainTabNavigator'
import Welcome from './../Pages/Swiper/Welcome'


  const MainRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: Welcome
        },
        SignedOut: {
          screen: MainTabNavigator
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };

export default class AppNavigator extends Component {

    state = {signedIn: false};

    constructor(props) {
        super(props);
        // DeviceStorage.delete('nickname')
        DeviceStorage.get('nickname').then((nickname)=>{
            console.log(nickname)
            if(nickname == null || nickname == 'nuevo'){
                this.setState({ 
                    signedIn: true,
                });
            } 
            console.log(this.state.signedIn)

        })

    }

    render() {
       
        const signedIn = this.state.signedIn
        const Layout = createAppContainer(MainRootNavigator(signedIn));
        return <Layout />;
        
    }
}



