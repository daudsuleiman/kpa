import * as SecureStore from 'expo-secure-store';


const key = 'authUser'

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync(key,authToken)  
        console.log("user saved")      
    } catch (error) {
        console.log("Error storing user"+error)
    }
}


const getToken = async() =>{
try {
    return await SecureStore.getItemAsync(key)
    
} catch (error) {
    console.log("Error getting user "+error)
}
}


const logOutUser = async() =>{
try {
   return await SecureStore.deleteItemAsync(key);
    
} catch (error) {
    console.log("error removing user: "+error)
}
}


export default{
    storeToken,
    getToken,
    logOutUser
};