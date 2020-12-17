import React from 'react';
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../configs/colors';
import AjiraText from './AjiraText';


function AjiraButton({children,onPress,style,width,icon, ...otherProps}){
return(
    <TouchableOpacity onPress={onPress} style={[styles.button, style,{width,}]} {...otherProps}>


{icon && <MaterialCommunityIcons name={icon} size={24} color="white" />
}

<AjiraText style={styles.text} >{children}</AjiraText>

    </TouchableOpacity>
);
}


const styles = StyleSheet.create({

    button:{
       backgroundColor: colors.primary,
       flexDirection:"row",
       marginHorizontal:6,
       justifyContent:"center",
       alignItems:"center",
       borderRadius:32
    },
    text:{
        color:colors.white,
        fontSize:16,
        fontWeight:"bold",
        paddingLeft:16
    }

});

export default AjiraButton;
