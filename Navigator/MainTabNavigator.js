import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs'
import DeviceStorage from './DeviceStorage'
import Welcome from './../Pages/Swiper/Welcome'

//import Home from '../Pages/Home'
import HomeStackNavigator from './HomeStackNavigator'

import Find from '../Pages/Find'
import Mine from '../Pages/Mine'
import Nearby from '../Pages/Nearby'


const ICON_LINK = './../assets/icons/'
// define bottom tab config
const TABS = {
    Home: {
        screen: HomeStackNavigator,
        navigationOptions: {
            tabBarLabel: 'inico', // nombre
            tabBarIcon: ({focused}) => {
                if (!focused) {
                    return <Image 
                        source={require(ICON_LINK + 'icons-home.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                } else {
                    return <Image 
                        source={require(ICON_LINK + 'icons-home-selected.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                }
            }

        }
    },
    Find: {
        screen: Find,
        navigationOptions: {
            tabBarLabel: 'share', // nombre
            tabBarIcon: ({focused}) => {
                if (!focused) {
                    return <Image 
                        source={require(ICON_LINK + 'icons-share.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                } else {
                    return <Image 
                        source={require(ICON_LINK + 'icons-share-selected.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                }
            }

        }
    },
    Nearby: {
        screen: Nearby,
        navigationOptions: {
            tabBarLabel: 'listado', // nombre
            tabBarIcon: ({focused}) => {
                if (!focused) {
                    return <Image 
                        source={require(ICON_LINK + 'icons-nearby.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                } else {
                    return <Image 
                        source={require(ICON_LINK + 'icons-nearby-selected.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                }
            }

        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: 'mio', // nombre
            headerTitle: 'listado',
            tabBarIcon: ({focused}) => {
                if (!focused) {
                    return <Image 
                        source={require(ICON_LINK + 'icons-mine.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                } else {
                    return <Image 
                        source={require(ICON_LINK + 'icons-mine-selected.png')} 
                        style={styles.bottomTabIconStyle}
                        />
                }
            }

        }
    }
}

const styles = StyleSheet.create({
    bottomTabIconStyle: {
        width: 20,
        height: 20
    }
})

export default class MainTabNavigator extends Component {


    _tabNavigator() {
        const {Home,Find,Nearby,Mine} = TABS
        // 
        const tabs = {Home,Nearby,Find,Mine}

        const TabScreens = createBottomTabNavigator(
            tabs,
            {
              tabBarComponent: props => (
                <BottomTabBar {...props} activeTintColor="rgba(51, 204, 153, 1)" />
              ),
            }
          );

        if(!this.tabNavigator) {
            this.tabNavigator = createAppContainer(TabScreens)
        }

        return this.tabNavigator;
    }

    render() {
        
        // DeviceStorage.delete("nickname");
        const TabNavigator = this._tabNavigator()

        return (
           
            <TabNavigator />
        )
    }
}
