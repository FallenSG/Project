import { styled } from '@mui/material';

export function Divider(){
    const Divider = styled('span')({
        height: "2px",
        width: "100%",
        display: "block",
        margin: "8px auto",
        backgroundColor: "lightgrey"
    })
    return <Divider />
}

export function GutterBottom(){
    const GutterBottom = styled('span')({
        height: '4px',
        width: '55px',
        display: 'block',
        margin: '8px auto 16px',
        backgroundColor: '#ff3366'
    });

    return <GutterBottom />
}