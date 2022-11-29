import {  } from '@mui/material'
import { useEffect, useState, useContext, createContext } from 'react'
import { useLocation } from 'react-router-dom'

import {PageLayout} from '../Components/PageLayout'

const Context = createContext({});

function BookList(){

}

export default function Genre(){
    const genre = useLocation().pathname.split('/')[2];
    const url = `genre/api/${genre}`;    

    return (
       <PageLayout 
            url={url}
            elem={<></>}
            gridElem={<BookList />}
            failureMsg="No Such Genre Exists"
       />
    )

}