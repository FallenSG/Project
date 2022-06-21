import { Grid, Stack } from "@mui/material";
import { styled, Box } from "@mui/system";
import Feed from "../Components/Feed";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Home(){
    return(
       <Box>
            <Navbar/>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>

                <Grid item xs={8}>
                    <Feed />
                </Grid>

                <Grid item xs={2}>
                </Grid>

            </Grid>
       </Box>
    )
}   
