import client from './client';


const endpoint = "/json.php";


const getFetchData = () => client.get(endpoint);


export default {
    getFetchData
}