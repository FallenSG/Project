import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useData() {
    const loc = useLocation().pathname;
    const navg = useNavigate();

    const AuthData = async(success) => {
        axios.get('/user')
            .then(resp => {
                if (resp.status === 200)
                    success()
            })
            .catch(err => navg(`/sign_in?fromUrl=${loc}`))
    }

   
    return AuthData;
}


export function useFetch(url){
    const [info, setInfo] = useState({})

    useEffect(() => {
        async function fetchData(){
            axios.get(url)
                .then((resp) => {
                    if (resp.status === 200)
                        setInfo({ status: 200, data: resp.data });
                    else if (resp.status === 204)
                        setInfo({ status: 204, data: resp.message });
                    else
                        console.log("Other type of request", resp.status);
                })
                .catch((err) => {
                    setInfo({ status: 400, data: err.response.data.data })
                    // console.log("Bad Request", err.resp.status);
                })
        }
        fetchData()

    }, [url])

    return info;
}