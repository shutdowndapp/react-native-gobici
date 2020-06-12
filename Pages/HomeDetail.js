import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput,Button,FlatList } from 'react-native'
import DeviceStorage from './../Navigator/DeviceStorage'
import { getDistance } from 'geolib';
import {UtmToLatLong} from './UtmLatLong';


const {width,height} = Dimensions.get('window')
const ICON_LINK = './../assets/icons/'

export default class HomeDetail extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        search_info: '',
        paradas: [],
        search_res: null,
        currentLocation: null
    }

    constructor() {
        super()
        
    }

    componentDidMount()
    {
        DeviceStorage.get('current_location').then((val)=>{
            if(val == null || val == ''){
                
            } else {
                
                this.setState({
                    currentLocation: val
                })
            }
        })
        // fetch('https://mapas.valencia.es/lanzadera/opendata/Valenbisi/JSON')
        fetch('https://api.jsonbin.io/b/5e87b98141019a79b61d1338')
        .then((response)=> response.json())
        .then((responseJson)=>{

            this.setState({
                paradas: responseJson.features
            });
            
        })

    }

   
    componentDidUpdate() {
        // console.log(this.state.filter_paradas)
    }

    _searchParada(val) {

        let value = val.replace(/^\s*|\s*$/g,"");
        if (value.length > 0) {
            let paradas = this.state.paradas
            let re = new RegExp(value, 'i');
            // paradas.map
            let filter_paradas = paradas.filter((res) =>  res.properties.name.search(re) !== -1)

            //console.log(filter_paradas[0])

            filter_paradas.map((item) => {
                let latlong = UtmToLatLong(
                    30,
                    item.geometry.coordinates[0],
                    item.geometry.coordinates[1],
                    true) 
                
                let current_location = this.state.currentLocation
                let distance = getDistance(latlong, current_location)
               
                item.distance = Number((distance/1000).toFixed(1))
                
                // item.distance = distance
                return item
            })

            
            //console.log(filter_paradas)

            let sort_filter_paradas = filter_paradas.sort(this._compare("distance"))

            this.setState({
                search_res: sort_filter_paradas
            })
            // return filter_paradas
        }
    }


    _getPointDistance(p1) {

    }

    _compare(property){
        return function(obj1,obj2){
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2;     
        }
   }


    render() {
        return (
            <View style={styles.homeDetail}>
                <View style={styles.topBoxView}>

                    <View style={{flex:0.5}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image 
                                style={styles.imagestyle} 
                                source={require(ICON_LINK + 'icons-arrow-left.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:4}}>
                        <TextInput 
                            style={styles.topText}
                            placeholder='Buscar aquí'
                            placeholderTextColor='#BFBFBF'
                            autoFocus={true}
                            keyboardType='default'
                            // onFocus={() => this.props.navigation.navigate('Home')}
                            onChangeText={(input_val) => { this._searchParada(input_val) }}
                        />
                    </View>
                    
                </View>
                <FlatList
                    // data={[{key: 'a'}, {key: 'b'}]}
                    // renderItem={({item}) => <Text>{item.key}</Text>}
                    data={this.state.search_res}
                    renderItem={({item}) => 
                        <View style={styles.listItem}>
                            <Text style={styles.listItemLeft}>{item.distance} km</Text>
                            <Text style={styles.listItemRight}>{item.properties.name}</Text>
                            <View style={{flex:0.5}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {
                                    coordinates: item.geometry.coordinates
                                })}>
                                    <Image 
                                        style={styles.imagestyle} 
                                        source={require(ICON_LINK + 'icons-up-left.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeDetail: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    topBoxView: {
        flexDirection:'row', 
        width: 0.9 * width, 
        height: 40,
        margin: 10, 
        padding:4, 
        alignItems:'center', 
        justifyContent:'center', 
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1, 
        borderColor: 'rgba(0,0,0,.12)',
    },
    topText: {
        
        // paddingLeft: 8,
        color: '#000'
    },
    imagestyle: {
        marginLeft: 5,
        height: 30,
        width: 30,
    },
    listItem: {
        height: 35,
        width: 0.9 * width, 
        padding: 5,
        borderColor: '#ccc',
        borderWidth: 2,
        borderBottomColor: '#fff',
        flex:1,
        flexDirection: 'row',
        justifyContent:'center', 
        alignItems:'center', 
    },
    listItemLeft: {
        flex: 1,
    },
    listItemRight: {
        flex: 4
    }

})
