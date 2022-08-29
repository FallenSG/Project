import { Grid, Stack } from "@mui/material";
import {Outlet} from "react-router-dom";
import Feed from "../Components/Feed";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Home(){
    var space = 1;
    return(
       <Stack spacing={2}>
            <Navbar/>
            <Grid container>
                <Grid item xs={space}>
                    <Sidebar />
                </Grid>

                <Grid item xs={12 - space * 2}>
                    <Feed />
                </Grid>

                <Grid item xs={space}>
                </Grid>

            </Grid>
            <Outlet />
       </Stack>
    )
}   
