
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, SafeAreaView,StyleSheet,View } from 'react-native';
import colors from "../configs/colors";

import Constants from "expo-constants";
import AjiraText from './AjiraText';




function AjiraTop({children}){
return(
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.avatarContainer}>
                <Image style={styles.image} source={require("../../assets/avatar.jpg")}/>
            <AjiraText style={{ color:colors.white, padding:8}}>Welcome Phenius</AjiraText>
            </View>

            <MaterialCommunityIcons name="menu-open" size={40} color="white" />
            {children}
        </SafeAreaView>
    </View>
);
}

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingLeft:10,
        marginVertical:10,
        flex:1,
        backgroundColor: colors.white
    },
    container:{
        backgroundColor: colors.secondary,       
        width:"100%",
        height:150,
        
    },
    image:{
        height:40,
        width:40,
        borderRadius:20
    },
    safeArea:{
        paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
    }
})

export default AjiraTop;