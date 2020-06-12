import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {createStackNavigator} from 'react-navigation-stack'

import Home from '../Pages/Home'
import HomeDetail from '../Pages/HomeDetail'

const HomeRootStack = createStackNavigator(
    {
        Home: Home,
        HomeDetail: HomeDetail
    },{
        initialRouteName: "Home",
        navigationOptions: ({navigation}) => ({
            tabBarVisible: navigation.state.index === 0
        })
    }
)

export default HomeRootStack