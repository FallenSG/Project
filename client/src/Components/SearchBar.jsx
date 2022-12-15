import { Autocomplete, TextField } from '@mui/material';
import { SearchSharp } from '@mui/icons-material';
import axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar(){
    const [Query, setQuery] = useState("");
    const [QueryResp, setQueryResp] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        
        if(Query !== ""){
            axios.get("/search", 
                { params: { q: Query } }, 
                { signal }
            ).then(resp => {
                var book = [], author = [];
                if (resp.data.books)
                    book = resp.data.books.map((option) => ({ title: option.title, url: `/book/${option._id}` }))
                if (resp.data.author)
                    author = resp.data.author.map((option) => ({ title: option.username, url: `/author/${option._id}` }))

                setQueryResp(book.concat(author));
            })
            .catch(err => console.log(err));
        }
        return () => controller.abort();
    }, [Query]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    return (
        <Autocomplete 
            sx={{ width: "100%", color: "#fff" }}
            id="searchBar"
            freeSolo
            getOptionLabel={(option) => option.title}
            options={QueryResp}
            onChange={(event, value, reason) => {
                nav(value.url);
            }}
            renderInput={(params) => (
                <TextField 
                    variant="standard"
                    {...params} 
                    placeholder="Search For Books or Author.." 
                    onChange={handleSearch}
                />
            )}
        />
    )
}