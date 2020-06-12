import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    createSwitchNavigator
  } from "react-navigation";

import {createStackNavigator} from 'react-navigation-stack'

import MainTabNavigator from './MainTabNavigator'
import Welcome from '../Pages/Swiper/Welcome'


export const MainRootNavigator = (signedIn = false) => {
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
