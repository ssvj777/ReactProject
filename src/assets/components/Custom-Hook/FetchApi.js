import { useEffect, useState } from "react"
import axios from 'axios'


function FetchApi(url){
    let [fetchData, setFetchData] = useState([]);
    
      let [error, setError] = useState(" ");
    
      let [loading, setLoading] = useState(true);

    useEffect(()=> {

        let fetchApi = async ()=>{
            try{

                // let response = await fetch(url)

                let response = await axios.get(url)
                setFetchData(response.data)
                // if(response.ok){
                //     let responseData = await response.json()
                //     setFetchData(responseData) 
                // }
                // else {
                //     throw new Error ("DataNotFound...")
                //     }
            }
            catch(error){
                setError(error.message)
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchApi()
    },[])

    return { fetchData, error, loading, setFetchData }
}

export default FetchApi