import React, { useState,useRef,useEffect } from 'react'
import { Image, FlatList, StyleSheet, View } from 'react-native';
import AjiraBottom from '../apps/components/AjiraBottom';
import AjiraText from '../apps/components/AjiraText';
import colors from '../apps/configs/colors';
import {SimpleLineIcons,Ionicons } from '@expo/vector-icons';
import AjiraProduct from '../apps/components/AjiraProduct';
import RBSheet from "react-native-raw-bottom-sheet";
import AjiraFab from '../apps/components/AjiraFab';
import useApi from '../apps/hooks/useApi';
import AjiraDataApi from '../apps/api/endpoints';
import AjiraLoader from '../apps/components/AjiraLoadIndicator';
import { set } from 'react-native-reanimated';

function AjiraAllProducts(){
    const refBottonsheet = useRef();
    const [RbData,setRBData] = useState({});
    const {isLoading,error,apiData, loadApiData} = useApi(AjiraDataApi.getFetchData);
    const [dataCat,setDataCat] = useState([]);

    const fetchData = async() => {
       const data = await loadApiData()
       setDataCat(data.products)
    }

    useEffect(() => {
       fetchData()
    }, [])

   

return(
    <View style={styles.cover}>

        <AjiraBottom>
         <AjiraLoader visible={isLoading} />

{!isLoading &&
     <FlatList
         ListHeaderComponent={
        <View>
        <AjiraText style={styles.name}>Products!</AjiraText>
           <View style={styles.recentCard}>
           <SimpleLineIcons name="list" size={18} color="black" /> 
            <AjiraText style={styles.recent}>All products</AjiraText>
          </View>
        </View>}

         data={dataCat}
         keyExtractor={(item)=>item.id.toString()}
         renderItem={({item})=>(
             <AjiraProduct name={item.name}
              price={item.price}  
              visible ={true}
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
    <AjiraText style={{color:colors.black,fontSize: 24,marginLeft:12 }}>Description </AjiraText>
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
                     fontSize: 26,
                      padding:6  ,
                    fontWeight:"bold",
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
        alignItems:"flex-end",
        padding:6
        
    },

    row: {
        flex: 1,
        justifyContent: "space-around"
    },

})
export default AjiraAllProducts;