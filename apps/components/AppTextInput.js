import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import {StyleSheet, TextInput, View } from 'react-native';
import colors from '../configs/colors';



function AppTextInput({icon,size,style,holder,...otherProps}){


return(
<View style={[styles.container,{height:size, borderRadius:size},style]}>
{icon && <MaterialCommunityIcons name={icon} size={24} color={colors.fadeGray} />}
<TextInput
      style={[styles.input,{height:size}]}
      placeholder={holder}
      {...otherProps} />
</View>);
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        paddingLeft:16,
        backgroundColor:colors.white
    },
    input:{
        width:"80%",
        marginLeft:8,
        marginRight:8
    }
})

export default AppTextInput;