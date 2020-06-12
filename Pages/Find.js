import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {ShareImage} from './ShareImage'

export default class Find extends Component {
    render() {
        return (
            <View style={styles.findStyle}>
                <ShareImage />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    findStyle: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
