import { 
    Menu, Stack, IconButton, Box, Button,
    Grid, styled, Typography, Divider 
} from '@mui/material'
import { Explore } from '@mui/icons-material'
import { useState } from 'react'

const Genre = ["Urban", "Eastern", "Games", "Fantasy", "Sci-Fi", "Horror", "Sports", "Action", "War", "Realistic", "History", "Mystery", "Drama"];
const CustDiv = styled('div')({
    display: "table-row",
    padding: "5px",
    width: "100%"
})

const StyledButton = styled(Button)({
    display: "table-cell",
})

const StyledText = styled(Typography)({
    fontVariantCaps: "all-petite-caps",
    display: "flex",
    justifyContent: "center",
    fontWeight: "500"
})


export default function ExploreMenu(){
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <Explore fontSize="large" sx={{ color: "white" }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="explore-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <Grid container sx={{
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "1.5",
                    letterSpacing: "1px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap"
                }}>
                    <Grid item xs={6} sx={{ display: "table" }}>
                        <CustDiv>
                            <StyledButton></StyledButton>
                            <StyledText variant="h5" sx={{ display: "table-cell" }}>Genre</StyledText>
                            <StyledButton></StyledButton>

                        </CustDiv>
                        <CustDiv>
                            <StyledButton href='/genre/Urban'>Urban</StyledButton>
                            <StyledButton href='/genre/Eastern'>Eastern</StyledButton>
                            <StyledButton href='/genre/Games'>Games</StyledButton>
                        </CustDiv>
                        <CustDiv>
                            <StyledButton href='/genre/Fantasy'>Fantasy</StyledButton>
                            <StyledButton href='/genre/Sci-fi'>Sci-fi</StyledButton>
                            <StyledButton href='/genre/Horror'>Horror</StyledButton>
                        </CustDiv>
                        <CustDiv>
                            <StyledButton href='/genre/Sports'>Sports</StyledButton>
                            <StyledButton href='/genre/Action'>Action</StyledButton>
                            <StyledButton href='/genre/War'>War</StyledButton>
                        </CustDiv>
                        <CustDiv>
                            <StyledButton href='/genre/Realistic'>Realistic</StyledButton>
                            <StyledButton href='/genre/History'>History</StyledButton>
                            <StyledButton href='/genre/Mystery'>Mystery</StyledButton>
                        </CustDiv>
                        <CustDiv>
                            <StyledButton href='/genre/Drama'>Drama</StyledButton>
                        </CustDiv>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs={6}>
                        <StyledText variant="h5">Ranking</StyledText>
                        <Stack alignItems="center">
                            <StyledButton href="/ranking/hot">Hot Ranking</StyledButton>
                            <StyledButton href="/ranking/popular">Popular Ranking</StyledButton>
                            <StyledButton href="/ranking/newest">Newest</StyledButton>
                            <StyledButton href="/ranking/all">Highest Rated</StyledButton>
                        </Stack>
                    </Grid>
                </Grid>

            </Menu>
        </Box>
    )
}
