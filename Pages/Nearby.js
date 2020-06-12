import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Share,TextInput, Button,TouchableHighlight, SectionList, Platform, TouchableOpacity, Alert } from 'react-native'
import Modal from 'react-native-modal';

 

const {width,height} = Dimensions.get('window')

export default class Nearby extends Component {

    onShare = async (res) => {
        try {
          const result = await Share.share({
            message:
              'name:'+ res.name + ' | address:'+ res.address + ' | available:'+ res.available
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    state = {
       
        paradas:[],
        isModalVisible: false,
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };

    

    componentDidMount()
    {
       
        // fetch('https://mapas.valencia.es/lanzadera/opendata/Valenbisi/JSON')
        fetch('https://api.jsonbin.io/b/5e87b98141019a79b61d1338')
        .then((response)=> response.json())
        .then((responseJson)=>{

            this.setState({
                paradas: responseJson.features
            });
            
        })

    }

    _getHeader() {
        let paradas = this.state.paradas
        let headers = paradas.map((prev) =>  prev.properties.address.charAt(0))
        // console.log(headers)
        let headers_filter = Array.from(new Set(headers))
        return headers_filter.sort()
    }

    _getContent(head) {
        let paradas = this.state.paradas

        const new_content = head.map((prev) => {
            let tmp_address = []

            paradas.filter((res) =>  {

                if(prev === res.properties.address.charAt(0)){
                    tmp_address.push(res.properties.address)
                }
                
            })
            // console.log(tmp_address)
            // console.log("+++++++\n")
            return {title: prev, data: tmp_address}
        })

        return new_content
    }

    _searchInfoWithAddress(address) {
        let paradas = this.state.paradas

        const current_parada = paradas.filter((res) => address === res.properties.address )

            // if(address === res.properties.address){
            //     tmp_address.push(res.properties.address)
            // }
        
        // console.log(current_parada)
        return current_parada[0].properties
    }

    render() {
        const headers_filter = this._getHeader()
        const new_content = this._getContent(headers_filter)
        //console.log(new_content)
        // new_content.map((rr) => console.log(rr.data[0].properties.address,"-------\n"))
        return (
            <View style={styles.nearby}>
                {/* <View style={styles.home}>
                    <TextInput 
                        style={styles.topText}
                        placeholder='Buscar parada'
                        placeholderTextColor='#BFBFBF'
                        // onFocus={() => this.props.navigation.navigate('HomeDetail')}
                    />
                </View> */}
                
                        
                            <SectionList
                                // sections={[
                                //     {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
                                //     {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                                // ]}
                                sections={new_content}
                                // renderItem={({item}) => <Text style={styles.item}>{item}</Text>}

                                renderItem={ ({item}) => (
                                    <View style={styles.item}>
                                      
                                        <TouchableOpacity onPress={this.toggleModal}>
                                            <Modal 
                                                isVisible={this.state.isModalVisible}
                                                backdropColor="#B4B3DB"
                                                backdropOpacity={0.8}
                                                animationIn="zoomInDown"
                                                animationOut="zoomOutUp"
                                                animationInTiming={100}
                                                // animationOutTiming={100}
                                                // backdropTransitionInTiming={100}
                                                // backdropTransitionOutTiming={100}
                                            >
                                                <View style={styles.modalContent}>
                                                    <Text style={styles.modalContentTitle}>name: {this._searchInfoWithAddress(item).name}</Text>
                                                    <Text style={styles.modalContentTitle}>address: {this._searchInfoWithAddress(item).address}</Text>
                                                    <Text style={styles.modalContentTitle}>available: {this._searchInfoWithAddress(item).available}</Text>
                    
                                                    <Button
                                                    onPress={this.onShare.bind(this,this._searchInfoWithAddress(item))}
                                                    title="share"
                                                    color="#841584"
                                                    />
                                                    <Button title="close" onPress={this.toggleModal} />
                                                   
                                                </View>
                                            </Modal>
                                            <Text style={styles.item}>{item}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                                keyExtractor={(item, index) => index}
                            />
                        
                    
                
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    nearby: {
        flex: 1,
        // backgroundColor: 'blue',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40
    },
    home: {
        
    },
    topText: {
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,.12)',
        height: 40,
        width: 0.9 * width,
        marginLeft: 0.05 * width,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 50,
        paddingLeft: 8,
        color: '#000',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
})

