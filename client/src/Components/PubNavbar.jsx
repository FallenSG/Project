import { AppBar, Toolbar, IconButton, Stack, Button, Link } from "@mui/material"
import { ArrowBack, Settings, Add } from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import { useContext } from "react";

import { Context } from "./PageLayout";

function CreateNav(){
    return (
        <>
            <IconButton>
                <ArrowBack sx={{ color: "white" }} />
                Go back
            </IconButton>   

            <Stack direction="row" spacing={2}>
                <Button variant="contained">Save Draft</Button>
                <Button variant="contained">Publish Chapter</Button>
            </Stack>
        </>
    )
}

function ViewNav(){
    // const { title, _id } = useContext(Context)?.book_id
    const title = useContext(Context)?.book_id.title;
    const _id = useContext(Context)?.book_id._id.$oid;
    return (
        <>
            <Button
                type="submit"
                href="/publish/list" 
                startIcon={ <ArrowBack /> } 
                sx={{ color: "white", ml: "3%" }}
            >
                {title}
            </Button>

            <Stack direction="row" spacing={2} sx={{ pr: "3%" }}>
                <Button 
                    type="submit"
                    href={`/publish/modify/${_id}`}
                    variant="outlined" 
                    sx={{ backgroundColor: "primary.main" }}
                >
                    <Settings sx={{ color: 'white' }} />
                </Button>
                
                <Button variant="contained" startIcon={ <Add /> }>
                    Create a Chapter
                </Button>
            </Stack>
        </>
    )
}

function ListNav(){
    return (
        <>
            <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ fontSize: 24, pl: "4%", outline: "none" }}
            >
                {'Project'}
            </Link>
            <Button 
                sx={{ mr: "3%", textTransform: "uppercase", fontVariantCaps: "tilting-caps", letterSpacing: "1px" }}
                variant="contained" startIcon={ <Add /> }>
                Create a Story
            </Button>
        </>
    )
}

export default function PubNavbar() {
    const path = useLocation().pathname.split('/')[2];
    const navType = {
        'create': <CreateNav />,
        'view': <ViewNav />,
        'list': <ListNav />
    }
    return (
        <AppBar position="sticky" sx={{ mb: "2%" }}>
            <Toolbar sx={{ backgroundColor: "navbar.main", justifyContent: "space-between" }}>
                { navType[path] }
            </Toolbar>
        </AppBar>
    )
}