import { useState } from "react";

export default useApi = (apiFunction) =>{

    const [apiData,setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadApiData = async () => {  
        setIsLoading(true);
        const response = await apiFunction();
        setIsLoading(false);

        if(!response.ok) return setError(true)
        setError(false)
        setApiData(response.data);
        return response.data; 

    }


    const login = ({email,password}) => {
    console.log(`email: ${email} password ${password}`)
    }


    

 return{isLoading, error, apiData, loadApiData,login}

}