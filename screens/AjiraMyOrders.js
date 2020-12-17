import React, { useState,useRef,useEffect } from 'react'
import { Image, FlatList, StyleSheet, View } from 'react-native';
import AjiraBottom from '../apps/components/AjiraBottom';
import AjiraText from '../apps/components/AjiraText';
import colors from '../apps/configs/colors';
import {SimpleLineIcons,Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import AjiraOrder from '../apps/components/AjiraOrder';
import AjiraItemSeparator from '../apps/components/AjiraItemSeparator';
import useApi from '../apps/hooks/useApi';
import AjiraDataApi from '../apps/api/endpoints';
import AjiraLoader from '../apps/components/AjiraLoadIndicator';


const definedColor = [
    colors.primary,
    colors.fadeGray,
    colors.secondary,
    colors.accent,
    "#0ED6B2",
  ];

  const getRandom = function (data) {
    return data[Math.floor(Math.random() * data.length)];
  };


function AjiraMyOrders(){
    const refBottonsheet = useRef();
    const [RbData,setRBData] = useState({});
    const {isLoading,error,apiData, loadApiData} = useApi(AjiraDataApi.getFetchData);
    const [data,setData] = useState([]);


    const fetchData = async() =>{
        const fetchedData = await loadApiData()

        let newData = []

        fetchedData.orders.map((order)=>{
                                fetchedData.products.map((product)=>{
                               if(product.id === order.id){
                         const filter = {
                             status: order.status,
                             name: product.name,
                             date:order.date,
                             quantity:order.quantity,
                             id:order.id,
                             picture:product.picture,
                             description:product.description
                            
                            };
                         newData.push(filter);
                 }
                     })

                       })
        setData(newData)
    }
    
    
    

    useEffect(() => { fetchData()  }, [])
        
        
            
    return(

        <View style={styles.cover}>
    
            <AjiraBottom>

          <AjiraLoader visible={isLoading}/>    
            

{!isLoading &&
         <FlatList
             ListHeaderComponent={
            <View>
            <AjiraText style={styles.name}>My Orders!</AjiraText>
               <View style={styles.recentCard}>
               <SimpleLineIcons name="list" size={18} color="black" /> 
                <AjiraText style={styles.recent}>Orders</AjiraText>
              </View>
            </View>}

            ItemSeparatorComponent={()=>(
                <AjiraItemSeparator
                style={{
                    width: "85%",
                    alignSelf: "flex-end",
                    backgroundColor: colors.fadeGray,
                  }}
                />
            )}
    
             data={data}
             keyExtractor={(item)=>item.id.toString()}
             renderItem={({item})=>(
                 <AjiraOrder
                  name={item.name}
                  status={item.status}  
                  date={item.date}
                  quantity={item.quantity}
                  text={item.status.substring(0,3).toLocaleUpperCase()} 
                  backgroundColor={getRandom(definedColor)}
                 onClick={()=>{
                     setRBData(item)
                     refBottonsheet.current.open();
                 }}
                 />
             )}/>}
    
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
    <MaterialCommunityIcons name="truck-delivery" size={25} color={colors.darkGray}/>

    <AjiraText style={{paddingLeft:6, color:colors.darkGray}}>{`status: ${RbData.status}`}</AjiraText>
    </View>
    </View>
    </View>
    
    <View style={styles.descriptionTag}>
        <AjiraText style={{color:colors.black,fontSize: 24,marginLeft:12 }}>Description </AjiraText>
        <AjiraText style={{color:colors.darkGray,fontSize: 18,marginLeft:12 }}>{RbData.description}</AjiraText>
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


export default AjiraMyOrders;