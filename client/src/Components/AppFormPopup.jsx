import { useState, useEffect } from 'react';
import { Grid, LinearProgress, styled } from '@mui/material'
import {
    CancelOutlined as Error,
    BlockOutlined as Blocked,
    CheckCircleOutlineSharp as Success,
} from '@mui/icons-material'

const Progress = styled(LinearProgress)({
    backgroundColor: "inherit"
});

const StyledGrid = styled(Grid)({
    // backgroundColor: "#f44336",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "28px",
    paddingTop: "8px",
});

const IconStyle = {
    color: "#E2DFD2",
    strokeWidth: 1, 
    fontSize: "45px"
}

const ColorTable = {
    'success': ["#4CAF50", ""],
    'error': ["#f44336", ""],
    'blocked': ["#3b7bff", ""]
}

const Icon = {
    'success': <Success sx={{ stroke: ColorTable['success'][0], ...IconStyle}} />,
    'error': <Error sx={{ stroke: ColorTable['error'][0],  ...IconStyle}} />,
    'blocked': <Blocked sx={{ stroke: ColorTable['blocked'][0], ...IconStyle}} />
}


function MainContent({bgColor, icon, msg}){
    const [progress, setProgress] = useState(0);
    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if(oldProgress === 100){
                    setIsShown(false);
                    // return 0;
                }
                return Math.min(oldProgress + 10, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    });

    return (
        <StyledGrid container sx={{
            bgcolor: bgColor,
            display: isShown ? 'block' : 'none',
        }}>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={1}> {icon} </Grid>
                <Grid item xs={10} sx={{ color: "white", pl: 1 }}> {msg} </Grid>
                <Grid item xs={1} onClick={() => setIsShown(false)} sx={{ 
                    textAlign: 'center', 
                    fontSize: '25px',
                    cursor: 'pointer'
                }}>&times;</Grid>
            </Grid>
            <Grid item sx={{ width: "100%", pt: 1 }}>
                <Progress variant="determinate" value={progress} color="secondary" />
            </Grid>
        </StyledGrid>
    )
}

export default function AppFormPopup({statusCode, msg}) {
    var bgColor, icon;
    if(statusCode === 200){
        bgColor = ColorTable['success'][0];
        icon = Icon['success'];
    }

    else if (statusCode === 404) {
        bgColor = ColorTable['error'][0];
        icon = Icon['error'];
    }

    else if (statusCode === 100) {
        bgColor = ColorTable['blocked'][0];
        icon = Icon['blocked'];
    }

    return (
        <MainContent bgColor={bgColor} icon={icon}  msg={msg} />
    )
}   