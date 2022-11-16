import { styled } from '@mui/material';

export function DividerVertical({ height='24px', backgroundColor = "#ff3366" }) {
    const DividerVertical = styled('span')({
        height,
        width: '2px',
        display: 'block',
        backgroundColor
    });

    return <DividerVertical />
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