import { Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from '../Components/Navbar'
import BookIDComp from '../Components/BookIDComp'
import Sidebar from '../Components/Sidebar'

export default function BookID(){
    var space = 1;
    return (
        <>
            <Navbar />
            {/* <Grid container>
                <Grid item xs={space}>
                    <Sidebar />
                </Grid>

                <Grid item xs={12 - space * 2}>
                    <BookIDComp />
                </Grid>

                <Grid item xs={space}>
                </Grid>

            </Grid> */}
            <BookIDComp />
            <Outlet />
        </>
    )
}