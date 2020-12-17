import React,{ useContext, useState } from 'react'
import { Image, StyleSheet,ToastAndroid, View } from 'react-native';
import AjiraButton from '../apps/components/AjiraButton';
import LottieView from 'lottie-react-native';
import AppTextInput from '../apps/components/AppTextInput';
import AjiraDataApi from '../apps/api/endpoints';
import { Formik } from 'formik';
import AjiraLoadIndicator from '../apps/components/AjiraLoadIndicator';
import useApi from '../apps/hooks/useApi';
import AuthContext from '../apps/auth/context';
import authStorage from '../apps/auth/authStorage';
import * as Yup from 'yup';
import AjiraText from '../apps/components/AjiraText';
import colors from '../apps/configs/colors';



const validationShcema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password')
});

function AjiraLogin(props){
    const authContext = useContext(AuthContext);
    const {error,isLoading,apiData,loadApiData} = useApi(AjiraDataApi.getFetchData);


const handleSubmit = async({email,password}) =>{
     const data = await loadApiData(); 
     
    { data.users.map((user)=>{

        if(email === user.email && password === user.password){
            authContext.setUser(user)
            authStorage.storeToken(JSON.stringify(user,data.company))
            console.log(user.name,"is present");
            return;
        }

        console.log(authContext.user)        
        if(typeof authContext.users === "undefined"){  

            console.log("invalid email or password")
            ToastAndroid.showWithGravityAndOffset(
                "invalid email or password!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );

        }

     })}

    
}
return(
    <View style={styles.container}>

{!isLoading&& 
<Image style={styles.lottieAnimation} source={require("../assets/illustrator.png")} />    }


    <AjiraLoadIndicator visible={isLoading} />

{!isLoading &&
<Formik
    initialValues={{email: "",password: ""}}
    validationSchema={validationShcema}
    onSubmit={values => { handleSubmit(values)}}>
     {({handleChange,handleSubmit,errors})=>(
         <>
<AppTextInput
 style={styles.input} 
  keyboardType={"email-address"} 
  numberOfLines={1}
   icon={"email"}
   size={56} 
   onChangeText={handleChange("email")} 
   holder={"Email address"}/>

     <AjiraText style={styles.error}>{errors.email}</AjiraText>

<AppTextInput 
style={{marginTop:16}}
 numberOfLines={1} 
 onChangeText={handleChange("password")} 
 secureTextEntry={true} 
 icon={"textbox-password"}
  size={56} holder={"Password"}/>
<AjiraText style={styles.error}>{errors.password}</AjiraText>

<AjiraButton  
style={styles.button} 
width={"80%"} icon={"login"} 
onPress={handleSubmit}
>Login</AjiraButton>
         
         </>
)}
   </Formik>
}

    </View>
);
}

const styles = StyleSheet.create({
    
    button:{
        marginTop:16,
        height:60,
    },  

    container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    },

    error:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        color: "red",
        fontSize: 12,
        width:"100%",
        marginLeft:64
    },
    lottieAnimation: {
        width: 180,
        height: 180,
        marginBottom:16
      },
})

export default AjiraLogin;