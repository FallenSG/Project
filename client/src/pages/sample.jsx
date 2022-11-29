import { useState } from 'react'
import { Grid, Paper } from '@mui/material'

export default function Sample(){
    const [ user, setUser ] = useState('samole')
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sx={{ height: "403px", backgroundColor: "Red" }}>
                Left side
            </Grid>

            <Grid item container xs={6} spacing={2}>
                <Grid item xs={12} sx={{ height: "201px", backgroundColor: "lightblue" }}>
                    Right Top
                </Grid>

                <Grid item xs={12} sx={{ height: "202px", backgroundColor: "green" }}>
                    Right Bottom
                </Grid>
            </Grid>
        </Grid>
    );
}