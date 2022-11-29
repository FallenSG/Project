import { } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import {PageLayout} from '../Components/PageLayout'
import Loading from '../Components/Loading'

export default function Author() {
    const location = useLocation();
    const [books, setBooks] = useState({});

    const fetchData = async () => {
        let genre = location.pathname.split('/')[2];
        const resp = await axios.get()
    }
}