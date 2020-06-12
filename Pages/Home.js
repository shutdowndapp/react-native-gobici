import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TextInput, Dimensions,Image } from 'react-native'
import DeviceStorage from './../Navigator/DeviceStorage'
import MapView, { Marker } from 'react-native-maps';
import {UtmToLatLong} from './UtmLatLong';
import * as Progress from 'react-native-progress';

const {width,height} = Dimensions.get('window')
const ICON_LINK = './../assets/icons/'

export default class Home extends Component {

    state = {
        initialRegion:{
            latitude: 39.466667,
            longitude: -0.375000,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        },
        paradas:[],
        progress: 0,
        region: null,
        antiRegion: null
    }

    componentDidMount()
    {
        // Update User's location
        this.getCurrentLocation();
        

        // Download JSON file
        // fetch('https://mapas.valencia.es/lanzadera/opendata/Valenbisi/JSON')
        fetch('https://api.jsonbin.io/b/5e87b98141019a79b61d1338')
        .then((response)=> response.json())
        .then((responseJson)=>{

            // Process the array to add latLong coordinates from UTM
            responseJson.features.forEach(element => {
                element.latlong = UtmToLatLong(
                    30,
                    element.geometry.coordinates[0],
                    element.geometry.coordinates[1],
                    true);
            });

            // Update the state with the new array
            // setState will redraw the component with the new information
            this.setState({
                ...this.state,
                paradas: responseJson.features
            });
            
        })
    }

    async getCurrentLocation() {
        await navigator.geolocation.getCurrentPosition(
            position => {
                let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                };
                
                this.setState({
                    antiRegion: region
                })
                // Animate the map to fly to current location
                this.mapView.animateToRegion(region, 2000);
                
                let current_location={
                    latitude: region.latitude,
                    longitude: region.longitude
                }

                DeviceStorage.save("current_location", current_location);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    static navigationOptions = {
        
        header: null
       
      };

   

    render() {
        const { params } = this.props.navigation.state;
        const coordinates = params ? params.coordinates : null;
        console.log(coordinates)
        if (coordinates) {
            const new_region = UtmToLatLong(
                30,
                coordinates[0],
                coordinates[1],
                true);
            
                region = {
                    latitude: new_region.latitude,
                    longitude: new_region.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }
            
        } else {
            region = this.state.antiRegion
        }
        

        return (

            <>

            <View style={styles.home}>
                <TextInput 
                    style={styles.topText}
                    placeholder='Buscar aquí'
                    placeholderTextColor='#BFBFBF'
                    onFocus={() => this.props.navigation.navigate('HomeDetail')}
                />
                
                
            </View>
            <View style={{ flex: 1}}>
            

            <MapView
                style = {{ flex: 1}}
                showsUserLocation = {true}
                followUserLocation = {true}
                zoomEnabled = {true}
                provider="google"
                ref={ref => (this.mapView = ref)}
                initialRegion = {this.state.initialRegion}
                region={region}
                // onRegionChange={this.onRegionChange}
            >


                {
                this.state.paradas.map(parada => {
                    
                    let progress = Number((parseInt(parada.properties.free)/parseInt(parada.properties.total)).toFixed(1))

                    return (

                    <Marker
                        key = {parada.properties.number}
                        coordinate={parada.latlong}
                        title={parada.properties.name}
                        description={parada.properties.address + "\n disponible:" + parada.properties.available}
                        image ={require(ICON_LINK + 'location.png')}
                        onCalloutPress={() => {
                            this.props.navigation.navigate("Detail",{parada:parada})
                            }
                        }
                    >
                     
                        <Progress.Bar progress={progress} width={40} color='red' style={{marginTop:28}}/>

                        
                    </Marker>
                            
                                
                )})
                }

            </MapView>
            
        </View>
        </>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        position:'absolute',
        zIndex: 10,
        marginLeft: 0.05 * width
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
    }
})
