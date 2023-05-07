import PropTypes from 'prop-types';
import {  
    List, ListItem, ListItemButton, ListItemText, Drawer, 
    ListSubheader, FormControl, Typography, Slider, Divider, 
    Radio, RadioGroup, FormControlLabel
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from './Loading';

import { useFetch } from '../customHooks/DataHandler';

const fontFamilies = ['Adamina', 'Abhaya Libre', 'Anaheim', 'Anonymous Pro', 'Barlow Semi'];
const themeSelection = [
    [
        "#E6C3AD", "hsl(23deg 53% 79% / 40%)", "#0D2035",
    ],
    [
        "#FFFAFA", "hsl(0deg 0% 99% / 40%)", "#000000"
    ],
    [
        "#E6F1F1", "hsl(180deg 28% 92% / 60%)", "#000000"
    ],
    [
        "#333333", "#333333", "#FFFFFF"
    ],
    [
        "#F4EFE7", "hsl(36.92deg 37.14% 93.14% / 50%)", "#000000"
    ],
    [
        "#FFFFE0", "hsl(60deg 100% 94% / 85%)", "#000000"
    ],
    [
        "#FFE5E5", "hsl(0deg 100% 94.9% / 75%)", "#000000"
    ],
    [
        "#E6E6FA", "hsl(240deg 67% 94% / 50%)", "#000000"
    ],
    [
        "#F5F5DC", "hsl(60deg 55.56% 91.18 % / 75%)", "#000000"
    ],

]

function StyledDrawer({readStyle, handleUpd, children}){
    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        handleUpd({open: false});
    };

    return (
        <>
            <Drawer
                key="big-screen"
                variant="persistent"
                anchor='right'
                open={readStyle.open}
                onClose={toggleDrawer}
                sx={{ display: { xs: "none", sm: "block" } }}
            >   
                {children}
            </Drawer>

            <Drawer
                key="small-screen"
                variant="persistent"
                anchor="bottom"
                open={readStyle.open}
                onClose={toggleDrawer}
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                {children}
            </Drawer>
        </>
    )   
}

StyledDrawer.propTypes = {
    children: PropTypes.node
}


function ReaderSetting({ readStyle, handleUpd }){
    const style = {
        flexDirection: "column",
        alignItems: "center"
    };

    return (
        <>
            <ListItem sx={{ ...style }}>
                <Typography variant="h4" sx={{ p: "0 16px" }}>Display Options</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ ...style }}>
                <Typography variant="body1" sx={{ color: "#83848f" }}>Background</Typography>
            </ListItem>

            <ListItem sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>
                {
                    themeSelection.map((val, i) =>
                        <span key={i} id={i}
                            onClick={() => handleUpd({theme: val})}
                            style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                                backgroundColor: `${val[0]}`,
                                border: "thin solid",
                                margin: "5px",
                                cursor: "pointer"

                            }}>
                        </span>
                    )
                }
            </ListItem>
            <Divider />
            <ListItem sx={{ ...style }}>
                <Typography variant="body1" sx={{ color: "#83848f" }}>Size</Typography>

                <Slider
                    aria-label="Font Size"
                    value={readStyle.fontSize}
                    getAriaValueText={(value) => value}
                    onChange={(event, value) => handleUpd({fontSize: value})}
                    valueLabelDisplay="auto"
                    step={2}
                    marks
                    min={14}
                    max={36}
                    sx={{ maxWidth: { xs: "80vw", sm: "40vw", md: "30vw" } }}
                />
            </ListItem>
            <Divider />
            <ListItem sx={{ ...style }}>
                <Typography variant="body1" sx={{ color: "#83848f" }}>Font Family</Typography>

                <FormControl>
                    <RadioGroup
                        value={readStyle.fontFamily}
                        onChange={(event) => handleUpd({ fontFamily: event.target.value})}
                    >{
                        fontFamilies.map((val) =>
                            <FormControlLabel value={val} control={<Radio />} label={val} />
                        )
                    }</RadioGroup>
                </FormControl>
            </ListItem>
        </>
    );

}

function Chapter({ print, UrlUpd }){
    const chapId = useLocation().pathname.split('/')[2]
    const book = chapId.split('_')[0];
    const navg = useNavigate();

    const feed = useFetch(`/chapter/list/${book}`, print);
    return (    
        <>{
            feed?.status === 200 ? 
                feed.data.publish.map((chapter)  => (
                    <>
                    <ListItemButton
                        key={chapter[1]}
                        selected={chapter[1] === chapId}
                        autoFocus={chapter[1] === chapId}
                        onClick={() => {
                            navg(`/chapter/${chapter[1]}`, { replace: true })
                            UrlUpd(`/chapter/api/${chapter[1]}`);
                        }}
                    >
                        <ListItemText>{chapter[0]}</ListItemText>
                    </ListItemButton>
                    <Divider />
                    </>
                )) : <Loading />
        }</>
    )
}

export default function Sidebar({ readStyle, handleUpd, UrlUpd }) {

    return (
        <StyledDrawer readStyle={readStyle} handleUpd={handleUpd}>
            <List sx={{
                width: { xs: "100%", sm: "45vw", md: "35vw" },
                height: { xs: "50vh", sm: "100vh" }
            }}>
                <ListSubheader sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", pt: "10px" }}>
                    <Close onClick={() => handleUpd({ open: false })} sx={{ cursor: "pointer" }} />
                </ListSubheader>
                
                {
                    readStyle.clicked === 'setting' ? 
                        <ReaderSetting readStyle={readStyle} handleUpd={handleUpd} /> : 
                        <Chapter print={readStyle.open} UrlUpd={UrlUpd}/>
                }
            </List>
        </StyledDrawer>
    )
}