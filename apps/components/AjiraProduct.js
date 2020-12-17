import React from 'react'
import { View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../configs/colors';
import AjiraText from './AjiraText';


function AjiraProduct({name,price,visible,image,onClick}){

 return visible ? (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Image style={styles.image} source={{uri: image}}/>
      <View style={styles.details}>
      <AjiraText style={{color: colors.black,
    fontSize: 16
    }} >{name} </AjiraText>
      <AjiraText style={{fontSize:18}} >{`Price: Kes${price}`}</AjiraText>
      </View>
    </TouchableOpacity>
) : null;

}
const styles = StyleSheet.create({
    container:{
    borderRadius: 16,
    backgroundColor: colors.white,
    elevation:6,
    width:"80%",
    overflow:"hidden",
    flex:1,
    marginVertical:6,
    marginHorizontal:6

    },
details:{
    padding:10
},
    image:{
        width:"100%",
        height:150,
    }
})


export default AjiraProduct;