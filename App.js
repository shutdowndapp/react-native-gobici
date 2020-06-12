import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeviceStorage from './Navigator/DeviceStorage';
import AppNavigator from './Navigator/AppNavigator'
// import TestInfo from './Pages/Swiper/TestInfo'
export default function App() {
  return (
    // <HomeScreen />
    // <HomeScreenWithParametro />
    // <MainTabNavigator />
    <AppNavigator />
    // <TestInfo />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
