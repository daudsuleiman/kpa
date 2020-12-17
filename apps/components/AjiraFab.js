import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import {StyleSheet,TouchableOpacity, Text } from 'react-native';

import colors from '../configs/colors';


function AjiraFab({icon,size,backgroundColor,text,onClick}){
return(
    <TouchableOpacity onPress={onClick} style={[{width:size,height:size,borderRadius:size/2, backgroundColor},styles.container]}>
       {text&& <Text style={styles.text}>{text.toUpperCase()}</Text>}
      {icon&&<MaterialCommunityIcons name={icon} size={size/2} color={colors.white} />}
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    container:{
     justifyContent:"center",
     alignItems:"center",
     elevation:6
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
      },
})

export default AjiraFab;