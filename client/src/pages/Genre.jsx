import { useLocation } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { Booklist } from '../Components/LDContent'
import { PageLayoutOverload } from '../Components/PageLayout'


function HighLight({ genre }){
    return (
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={12}>
                <Typography 
                    variant="h3" 
                    sx={{ pt:"5px", pl:"8.5%", fontVariantCaps: "all-petite-caps" }}
                > {`${genre} Collection`} </Typography>
            </Grid>
        </Grid>
    )
}

export default function Genre(){
    const genre = useLocation().pathname.split('/')[2];

    return (
       <PageLayoutOverload
            elem={<HighLight genre={genre} />}
            gridElem={<Booklist url={`/genre/api/${genre}`} />}
       />
    )

}