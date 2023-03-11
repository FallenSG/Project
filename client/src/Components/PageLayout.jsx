import { Grid, Typography, Paper } from '@mui/material'
import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

import Navbar from './Navbar'
import PubNavbar from './PubNavbar'
import AppFormNav from './AppFormNav'
import Loading from './Loading'

export const Context = createContext({});

const NavType = {
    'none': <></>,
    'normal': <Navbar />,
    'publish': <PubNavbar />,
    'form': <AppFormNav />
};


export function PageLayout({ url, nav='normal', elem, gridElem, failureMsg, columns = 12, gridXs = 10 }){
    const [info, setInfo] = useState({});

    const fetchData = async() => {
        axios.get(url)
            .then((resp) => {
                if(resp.status === 200)
                    setInfo({status: 200, data: resp.data});
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
            <Grid container sx={{ justifyContent: 'center' }} columns={columns}>
                {NavType[nav]}
                <Grid item xs={columns}> { element } </Grid>
                <Grid item xs={gridXs}>
                    <Typography sx={{ justifyContent: "center", alignItems: "center" }}> {message} </Typography>
                </Grid>
                <Grid item xs={gridXs}> { gridElement } </Grid>
            </Grid>
        </Context.Provider>
    )
}

export function PageLayoutOverload({ nav = 'normal', elem, gridElem, columns = 12, gridXs = 10 }){
    return (
        <Grid container columns={columns} sx={{ justifyContent: 'center' }}>
            <Grid item xs={columns}> {NavType[nav]} </Grid>
            <Grid item xs={columns}> {elem} </Grid>
            <Grid item xs={gridXs}> {gridElem} </Grid>
        </Grid>
    )
}

export function PageLayoutPublish({ url, nav="publish", gridElem, failureMsg, columns=12, gridXs=11 }){
    return (
        <PageLayout 
            url={url}
            nav={nav}
            gridElem={
                <Paper sx={{ mt: "2%", backgroundColor: "#f6f7fc" }}>
                    {gridElem}
                </Paper>
            }
            failureMsg={failureMsg}
            columns={columns}
            gridXs={gridXs}
        />
    )
}
