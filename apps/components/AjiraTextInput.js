import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import {StyleSheet,View,TextInput} from 'react-native'
import colors from '../configs/colors';



function AjiraTextInput({ icon,placeholder,size, width = "90%", ...otherProps }){

    return(
        <View style={[styles.container, { width,borderRadius:size/2 }]}>
        {icon&& <MaterialCommunityIcons name={icon} size={size/2} color={colors.darkGray} />}
       <TextInput style={[styles.inputField,{height:size}]}  placeholder={placeholder}/>
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
export default AjiraTextInput;