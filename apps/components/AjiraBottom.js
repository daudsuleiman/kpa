import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import colors from '../configs/colors';



function AjiraBottom({children}){

return(
    <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>
)

}

const styles = StyleSheet.create({
    container: {
        paddingLeft:16,
        paddingRight:16,
        paddingTop:3,
        borderTopLeftRadius:32,
        borderTopRightRadius:32,
        marginTop: 10,
        backgroundColor: colors.white,
        flex:2
        
    }
})

export default AjiraBottom;