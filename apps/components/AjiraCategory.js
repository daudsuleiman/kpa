import React from 'react'
import { View,StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';
import AjiraText from './AjiraText';



function AjiraCategory(){

return(
    <View style={styles.header}>
<MaterialCommunityIcons name="format-list-bulleted" size={30} color={colors.fadeGray} />
<AjiraText style={styles.text}>New Products</AjiraText>
    </View>
);

}

const styles = StyleSheet.create({
    header:{
        flexDirection:"row",
        padding:16,
        justifyContent:"flex-start",
        alignItems:"flex-end"
        

    },

    text:{
     color: colors.darkGray,
     fontSize:20,
     paddingLeft:6
    }
})


export default AjiraCategory;