import { Autocomplete, TextField } from '@mui/material';
import { SearchSharp } from '@mui/icons-material';
import axios from 'axios'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar(){
    const searchQuery = useRef("");
    const [Query, setQuery] = useState([]);
    const nav = useNavigate();

    const handleChange = (event) => {
        const query = searchQuery.current.value;

        if(query !== ""){
            axios.get(`/search?q=${query}`)
                .then(resp => {
                    var book = [], author = [];
                    if(resp.data.books)
                        book = resp.data.books.map((option) => ({ title: option.title, url:`/book/${option._id}` }))
                    if(resp.data.author)
                        author = resp.data.author.map((option) => ({ title: option.username, url: `/author/${option._id}` }))

                    setQuery( book.concat(author) );
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Autocomplete 
            sx={{ width: "100%", color: "#fff" }}
            id="searchBar"
            freeSolo
            getOptionLabel={(option) => option.title}
            options={Query}
            onChange={(event, value, reason) => {
                nav(value.url);
            }}
            renderInput={(params) => (
                <TextField 
                    variant="standard"
                    {...params} 
                    placeholder="Search For Books or Author.." 
                    inputRef={searchQuery}
                    onChange={handleChange}
                />
            )}
        />
    )
}
