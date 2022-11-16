import { Grid } from '@mui/material'
import Navbar from './Navbar'
import AppFormNav from './AppFormNav'

export default function PageLayout({ nav, element, gridElem }){
    const NavType = {
        'normal': <Navbar />,
        'form': <AppFormNav />
    };

    return (
        <Grid container sx={{ justifyContent: 'center' }}>
            <Grid item> { NavType[nav] } </Grid>
            <Grid item xs={12}> { element } </Grid>
            <Grid item xs={ 10 }> { gridElem } </Grid>
        </Grid>
    )
}