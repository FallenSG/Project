import { useState, useEffect } from 'react';
import { LinearProgress as Progress, styled, Alert, Stack } from '@mui/material'

const StyledStack = styled(Stack)({
    marginTop: "28px",
    paddingTop: "8px",
});

const StyledAlert = styled(Alert)({
    padding: "16px 16px",
    fontSize: 15,
    fontWeight: 400,
    borderRadius: "4px 4px 0 0"
})


function MainContent(props){
    const { bannerType, msg } = props;

    const [progress, setProgress] = useState(0);
    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        setIsShown(true);
        setProgress(0);

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
    }, [msg]);

    return (
        <StyledStack sx={{
            display: isShown ? 'block': 'none'
        }}>
            <StyledAlert variant="filled" severity={bannerType} onClose={() => setIsShown(false)}>
                {msg}
            </StyledAlert>
            <Progress sx={{bgcolor: "inherit"}} variant="determinate" value={progress} color="secondary" />
        </StyledStack>
    )
}

export default function AppFormPopup({statusCode, msg}) {
    if(statusCode === null || msg === null) return;

    return (
        <MainContent bannerType={statusCode} msg={msg} />
    )
}   