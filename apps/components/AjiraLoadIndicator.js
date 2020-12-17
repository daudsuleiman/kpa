import React from 'react'
import LottieView from 'lottie-react-native';


function AjiraLoadIndicator({visible=false}){

    if(!visible)return null;


    return <LottieView
    autoPlay={true}
    loop={true}
    source={require('../../assets/lottie/loader.json')}
    />




}

export default AjiraLoadIndicator;