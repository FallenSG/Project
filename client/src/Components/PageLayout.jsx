import { Grid, Typography } from '@mui/material'
import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

import Navbar from './Navbar'
import AppFormNav from './AppFormNav'
import Loading from './Loading'

export const Context = createContext({});

export function PageLayout({ url, nav='normal', elem, gridElem, failureMsg }){
    const NavType = {
        'normal': <Navbar />,
        'form': <AppFormNav />
    };

    const [info, setInfo] = useState({});

    const fetchData = async() => {
        axios.get(url)
            .then((resp) => {
                if(resp.status === 200)
                    setInfo({status: 200, data: resp.data.data});
                else if(resp.status === 204) 
                    setInfo({ status: 204, data: resp.message });
            })
            .catch((err) => {
                setInfo({ status: 400, data: err.response.data.data })
                // console.log("Bad Request", err.resp.status);
            })
    };

    useEffect(() => {
        fetchData();
    }, []);

    var gridElement = <Loading />, element, message;
    if(info.status === 200){
        gridElement = gridElem;
        element = elem;
    }
    else if (info.status === 204){
        gridElement=<></>;
        message = failureMsg ? failureMsg : info.data;
    }

    return (
        <Context.Provider value={info?.data}>
            <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item> { NavType[nav] } </Grid>
                <Grid item xs={12}> { element } </Grid>
                <Grid item xs={10}>
                    <Typography sx={{ justifyContent: "center", alignItems: "center" }}> {message} </Typography>
                </Grid>
                <Grid item xs={ 10 }> { gridElement } </Grid>
            </Grid>
        </Context.Provider>
    )
}
