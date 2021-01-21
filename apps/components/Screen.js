import React from 'react'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'


const Screen = ({children}) =>{

    return(
    <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>);
}


const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    }
})


export default Screen;