import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import colors from '../configs/colors';
import AjiraFab from './AjiraFab';
import AjiraText from './AjiraText';


function AjiraOrder({onClick,text,name,status,date,quantity,backgroundColor}){

return(
    <TouchableOpacity style={styles.opa} onPress={onClick}>
        <View style={styles.outter}>
            <AjiraFab style={styles.fab} text={text} size={56} backgroundColor={backgroundColor}/>

            <View style={styles.inner}>
                <AjiraText style={styles.name}>{`${name}`}</AjiraText>
                <AjiraText style={styles.status}>{`Status: ${status}`}</AjiraText>
            </View>

            <View style={styles.innerEnd}>
                {/* <AjiraText >{`Quantity: ${quantity}`}</AjiraText> */}
                <AjiraText style={{color:colors.fadeGray, fontSize:16}}>{`${date}`}</AjiraText>
            </View>

        </View>
    </TouchableOpacity>
);

}

const styles = StyleSheet.create({
    fab:{
        justifyContent:"flex-start",
        alignItems:"flex-start"
    },  
    inner:{
        marginLeft:6,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flex:1

    },
    innerEnd:{
        marginRight:6,
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    name:{
        color:colors.black,
        fontSize: 18
    },
    outter:{
    flexDirection:"row",
    
    },
    status:{
        marginTop:8,
        color:colors.darkGray,
        fontSize:16
    },
    opa:{
    marginTop:6
    }
})


export default AjiraOrder;