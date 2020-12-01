
>   use expo

## go bicycle / valencia go bike

### use navigation

    yarn add react-navigation-stack

    import { createStackNavigator } from 'react-navigation-stack';

### switch screen

    this.props.navigation.navigate("router module name")
    this.props.navigation.push("router module name")
    this.props.navigation.goBack("router module name")
    this.props.navigation.popToTop("router module name")

### set screen title

    https://reactnavigation.org/docs/4.x/headers/

### router transfer parameter and get parameter

    <Button 
        title="skip to detail page"
        onPress={ () => this.props.navigation.navigate('Detail', {
            nId: 001,
            nName: 'test name',
            nTag: 'tt'
        }) }
    />

    https://reactnavigation.org/docs/4.x/params

    get total:  {JSON.stringify(navigation.state.params)}

### tab page

    https://reactnavigation.org/docs/4.x/bottom-tab-navigator/

    createBottomTabNavigator


### componente usado

    [swiper](https://github.com/leecade/react-native-swiper)

    [pop-ups](https://github.com/react-native-community/react-native-modal)

### tips 
    es6：const { navigation } = this.props;  


