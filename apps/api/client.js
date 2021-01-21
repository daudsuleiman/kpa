import { create } from 'apisauce';
import cache from '../util/Cache';


apiClient = create({
    baseURL: "http://koodiweb-service-apis.herokuapp.com/api"
});

const get = apiClient.get;

apiClient.get = async (url,params,axiosConfig)=>{

const response = await  get(url,params,axiosConfig);

if (response.ok){
    cache.store('1',response.data)
    return response;
}

const data = await cache.get('1');
return data ? { ok: true, data } : response;

}

export default apiClient;
