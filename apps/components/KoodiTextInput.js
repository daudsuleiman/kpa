import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import {StyleSheet,View,TextInput} from 'react-native'
import colors from '../configs/colors';



function KoodiTextInput({ icon, placeholder, size, onChangeText, width = "90%", ...otherProps}){

    const handleTectChange = (text) =>{
        onChangeText(text)
    }

    return(
        <View style={[styles.container, { width,borderRadius:size/2 }]}>
        {icon&& <MaterialCommunityIcons name={icon} size={size/2} color={colors.darkGray} />}
       <TextInput  style={[styles.inputField,{height:size}]} {...otherProps}  placeholder={placeholder} onChangeText={handleTectChange}/>
      </View>
    );
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:colors.lightGray,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginVertical: 10,
    },

    inputField:{
          fontSize: Platform.OS === "ios" ? 22 : 20,
          fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
          marginLeft:16,         

}

})
export default KoodiTextInput;