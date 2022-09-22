import { useState, useEffect } from 'react';
import { Grid, LinearProgress as Progress, styled } from '@mui/material'
import {
    CancelOutlined as Error,
    BlockOutlined as Blocked,
    CheckCircleOutlineSharp as Success,
} from '@mui/icons-material'

const StyledGrid = styled(Grid)({
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

const statusArr = {
    'success': { 
        bgColor: ColorTable['success'][0], 
        icon: <Success sx={{ stroke: ColorTable['success'][0], ...IconStyle }} />
    },
    'error': { 
        bgColor: ColorTable['error'][0], 
        icon: <Error sx={{ stroke: ColorTable['error'][0], ...IconStyle }} /> 
    },
    'blocked': { 
        bgColor: ColorTable['blocked'][0], 
        icon: <Blocked sx={{ stroke: ColorTable['blocked'][0], ...IconStyle }} />
    },
}


function MainContent(props){
    const { bgColor, icon, msg } = props;

    const [progress, setProgress] = useState(0);
    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        setIsShown(true);
        setProgress(0);
    }, [msg])

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if(oldProgress === 100){
                    setIsShown(false);
                }
                return Math.min(oldProgress + 5, 100);
            });
        }, 200);

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
                <Progress sx={{bgcolor: "inherit"}} variant="determinate" value={progress} color="secondary" />
            </Grid>
        </StyledGrid>
    )
}

export default function AppFormPopup({statusCode, msg}) {
    if(statusCode === null || msg === null) return;

    const { bgColor, icon } = statusArr[statusCode];
    return (
        <MainContent bgColor={bgColor} icon={icon}  msg={msg} />
    )
}   