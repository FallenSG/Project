import { AppBar, Toolbar, Stack, Button, Link, Typography } from "@mui/material"
import { Settings, Add, Bookmark, Done } from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from 'axios'

import { Context } from "./PageLayout";

function pathEst(path) {
    let Break = 3;
    let arr = path.split('/').filter((x, i) => {
        if (i > 1 && i < Break) {
            if (i === 2 && x === 'chapter') Break++;
            return x;
        }
        return ""
    })
    return arr.join('/');
}

function ViewNav(){
    const _id = useContext(Context)?.book_id._id;

    return (
        <Stack direction="row" spacing={2} sx={{ pr: "3%" }}>
            <Button 
                type="submit"
                href={`/publish/modify/${_id}`}
                variant="outlined" 
                sx={{ backgroundColor: "primary.main" }}
            >
                <Settings sx={{ color: 'white' }} />
            </Button>
            
            <Button
                href={`/publish/chapter/create/${_id}`}
                variant="contained" 
                startIcon={ <Add /> }
            >
                Create a Chapter
            </Button>
        </Stack>
    )
}

function ListNav(){
    return (
        <Button 
            href="/publish/create"
            sx={{ mr: "3%", textTransform: "uppercase", fontVariantCaps: "tilting-caps", letterSpacing: "1px" }}
            variant="contained" startIcon={ <Add /> }
        >
            Create a Story
        </Button>
    )
}

function Chapter({handleClick}){
    return (
        <Stack direction="row" spacing={2}>
            <Button
                id="draft"
                variant="contained"
                onClick={handleClick}
                startIcon={<Bookmark />}
            >
                <Typography
                    id="draft"
                    variant="button"
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    Save Draft
                </Typography>
            </Button>

            <Button
                id="publish"
                variant="contained"
                onClick={handleClick}
                startIcon={<Done />}
            >
                <Typography
                    id="publish"
                    variant="button"
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    Publish Chapter
                </Typography>
            </Button>
        </Stack>
    )
}

function ChapCreate({ val, path }){
    const navg = useNavigate()

    const handleClick = (event) => {
        const query = event.target.id
        if(!val.title && !val.content) return;

        axios.post(`${path}?q=${query}`, { ...val })
            .then(resp => {
                const data = resp.data;
                if(query === 'draft')
                    navg(`/publish/chapter/edit/${data.chpId}`, { replace: true })
                else if(query === 'publish')
                    navg(`/chapter/${data.chpId}`)
            })
            .catch(err => {});
    }

    return (
        <Chapter handleClick={handleClick}/>
    )
}

function ChapModify({ val, path }){
    const navg = useNavigate()

    const handleClick = (event) => {
        const query = event.target.id
        if (!val.title && !val.content) return;

        axios.post(`${path}?q=${query}`, { ...val })
            .then(resp => {
                const data = resp.data;
                if (query === 'publish')
                    navg(`/chapter/${data.chpId}`)
            })
            .catch(err => { });
    }
    return (
        <Chapter handleClick={handleClick}/>
    )
}

export default function PubNavbar({ val }) {
    const rawPath = useLocation().pathname;
    const path = pathEst(rawPath);

    const navType = {
        'view': <ViewNav />,
        'list': <ListNav />,
        'chapter/create': <ChapCreate val={val} path={rawPath} />,
        'chapter/edit': <ChapModify val={val} path={rawPath} />
    }
    return (
        <AppBar position="sticky" sx={{ mb: "2%" }}>
            <Toolbar sx={{ backgroundColor: "navbar.main", justifyContent: "space-between" }}>
                <Link
                    variant="h6"
                    underline="none"
                    color="inherit"
                    href="/"
                    sx={{ fontSize: 24, pl: "4%", outline: "none" }}
                >
                    {'Project'}
                </Link>

                {navType[path]}

            </Toolbar>
        </AppBar>
    )
}