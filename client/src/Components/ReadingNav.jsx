import {
    AppBar, Toolbar, Link, Breadcrumbs, Typography, styled
} from '@mui/material'
import { useContext } from 'react'

import { Context } from './PageLayout'

const StyledToolbar = styled(Toolbar)( ({ theme }) => ({
    display: "flex",
    justifyContent: { sm: "flex-start", xs: "center"}, 
    backgroundColor: theme.palette.navbar.main
}));


export default function ReadingNav(){
    const data = useContext(Context)?.bookInfo;

    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Link
                    variant="h6"
                    underline="none"
                    color="inherit"
                    href="/"
                    sx={{ fontSize: 24, outline: "none", pr: {sm: "50px", xs: "0"} }}
                >
                    {'Project'}
                </Link>

                <Breadcrumbs sx={{ display: { sm: "block", xs: "none" }, color: "white" }}>
                    <Link href={`/book/${data?._id}`} underline="hover" color="inherit">{ data?.title }</Link>
                    <Typography color="lightgrey">{data?.publish[0]}</Typography>
                </Breadcrumbs>
            </StyledToolbar>
        </AppBar>
    )
}