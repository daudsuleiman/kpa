import React, { useState,useRef,useEffect, useContext } from 'react'
import { Image, FlatList, StyleSheet, View } from 'react-native';
import AjiraBottom from '../apps/components/AjiraBottom';
import AjiraText from '../apps/components/AjiraText';
import colors from '../apps/configs/colors';
import {MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import AjiraProduct from '../apps/components/AjiraProduct';
import RBSheet from "react-native-raw-bottom-sheet";
import AjiraFab from '../apps/components/AjiraFab';
import useApi from '../apps/hooks/useApi';
import AjiraDataApi from '../apps/api/endpoints';
import AjiraLoader from '../apps/components/AjiraLoadIndicator';
import AuthContext from '../apps/auth/context';
import LottieView from 'lottie-react-native';


function AjiraDashboard({navigation}){
    const {user} = useContext(AuthContext);
    const refBottonsheet = useRef();
    const [RbData,setRBData] = useState({});
    const {isLoading,error,apiData, loadApiData} = useApi(AjiraDataApi.getFetchData);

    useEffect(() => {
       loadApiData()
    }, [])
    const data = apiData.products;
    const company = apiData.company;
    

return(
    <View style={styles.cover}>

        <AjiraBottom>
         <AjiraLoader visible={isLoading} />

{!isLoading &&
     <FlatList
         ListHeaderComponent={

            <View>          

        <View style={styles.topview}>

        <AjiraText style={styles.name}>{`Hello, Welcome ${user.username.toUpperCase()}!`}</AjiraText>
</View>

           <View style={styles.recentCard}>
           <MaterialCommunityIcons name="cart-outline" size={24} color="black" />

            <AjiraText style={styles.recent}>New products</AjiraText>
          </View>

        </View>}

         data={data}
         keyExtractor={(item)=>item.id.toString()}
         renderItem={({item})=>(
             <AjiraProduct name={item.name}
              price={item.price}  
              visible ={item.new}
              image={item.picture} 
              onClick={()=>{
                 setRBData(item)
                 refBottonsheet.current.open();
             }}
             />
         )}
           numColumns={2}
           columnWrapperStyle={styles.row}
           />}

        </AjiraBottom>

        
    <RBSheet
          ref={refBottonsheet}
          animationType={"fade"}
          height={500}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            },
            wrapper: {},
            draggableIcon: {
              backgroundColor: colors.primary,
            },
          }}
        >

<View style={{
    borderRadius:16,
    overflow:"hidden",
    marginLeft:16,
    marginRight:16,
    marginTop:-6,
    elevation:6

}}>
     <Image style={styles.bigImage} source={{uri: RbData.picture}}/>
</View>



<View style={styles.priceTag}>

    <View style={{
        flex:1
    }}>
<AjiraText style={{
    color:colors.black,
    fontWeight:"bold"
}}>{RbData.name}</AjiraText>


<View style={styles.priceC}>
<Ionicons name="ios-pricetags" size={20} color={colors.darkGray} />
<AjiraText style={{paddingLeft:6, color:colors.darkGray}}>{`Kes${RbData.price}`}</AjiraText>
</View>
</View>
<AjiraFab onClick={()=>{
    refBottonsheet.current.close();
}} style={styles.fab} icon={"cart-outline"} backgroundColor={colors.primary} size={56}/>
</View>

<View style={styles.descriptionTag}>
    <AjiraText style={{color:colors.black,fontSize: 24,marginLeft:12, }}>Description </AjiraText>
<AjiraText style={{color:colors.darkGray,fontSize: 18,margin:12 }}>{RbData.description}</AjiraText>
</View>

        </RBSheet>
    </View>
);

}

const styles = StyleSheet.create({

    bigImage:{
        width:"100%",
        height:200,
    },
    
    cover:{
        flex:1,
        backgroundColor:colors.primary,
    },
                    name:{
                     fontSize: 18,
                      padding:8  ,
                    fontWeight:"bold",
                    marginTop:6
                },


     descriptionTag:{
         justifyContent:"flex-start",
         alignItems:"flex-start",
         
     },         
fab:{
    justifyContent:"flex-end",
    alignItems:"flex-end",
    flex:1
},

    priceC:{
        flexDirection:"row",        
        marginTop:6,
        justifyContent:"flex-start",
        alignItems:"flex-end"

    },
    priceTag:{
        padding:16,
        flexDirection:"row",

    },
    recent:{
        color:colors.darkGray,
        fontSize:18,
        paddingLeft:8
        
    },
    recentCard:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginTop:16,
        marginBottom:16,
        padding:6
        
    },

    row: {
        flex: 1,
        justifyContent: "space-around"
    },

    topview:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    lottieAnimation: {
        width: 80,
        height: 80,
      },

})
export default AjiraDashboard;