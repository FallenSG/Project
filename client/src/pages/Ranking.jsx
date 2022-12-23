import { useLocation } from "react-router-dom";
import { Grid, Typography } from '@mui/material';
import { Booklist } from '../Components/LDContent';
import { PageLayoutOverload } from "../Components/PageLayout";

function HighLight({ RankingType }) {
    return (
        <Grid container sx={{ backgroundColor: "#f5f6fc", justifyContent: "center" }}>
            <Grid item xs={10}>
                <Typography variant="h3" sx={{ p: "5px 0" }}> {RankingType} </Typography>
            </Grid>
        </Grid>
    )
}

export default function Ranking(){
    const rank = useLocation().pathname.split('/')[2];

    return (
        <PageLayoutOverload 
            elem={<HighLight RankingType={rank} />}
            gridElem={<Booklist url={`/ranking/api/${rank}`} />}
        />
    )
}