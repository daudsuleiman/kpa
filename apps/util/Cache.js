import { AsyncStorage } from 'react-native'

const store = async (key, value) =>{
try{
    const item = {
        value,
        timestamp: Date.now()
    }
await AsyncStorage.setItem(key,JSON.stringify(item))
}
catch(error){
    console.log(error)
}

}



const get = async (key) =>{

    try{
        const value = await AsyncStorage.getItem(key)
        const item = JSON.parse(value);
        if(!item){
console.log("item not found")
return null;
        } 
        console.log("item was found") 
        return item.value;
    }
    catch(error){
console.log(error)
    }
}


const logout = async (key) => {
    try {
        const value = await AsyncStorage.removeItem(key);
        return null;
        
    } catch (error) {
        console.log(error)
    }
    }

export default {
    store,
    get,
    logout
}