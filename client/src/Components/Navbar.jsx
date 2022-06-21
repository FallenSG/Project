import { AppBar, Toolbar, styled, Typography, InputBase, Paper, IconButton, Stack, InputLabel, Input, InputAdornment } from '@mui/material'
import { AccountCircleOutlined, Book, ExploreOutlined, Search } from '@mui/icons-material'
import React from 'react'
import { Box } from '@mui/system';

const dispStyle = {
  fullScreen: {
    xs: "none",
    sm: "block"
  },

  mobScreen:{
    xs: "block",
    sm: "none"
  }
};

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});

const Left = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
}));

const Center = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  // margin: "0 0 0 5px",
  borderRadius: theme.shape.borderRadius,
  width: "30%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}));

const Right = styled(Stack)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  color: 'black'
}));

function Navbar() {
  return (
    <AppBar position="sticky">
        <StyledToolbar>
          <Left direction="row" spacing={2}>
            <Typography variant="h5" sx={{ display: dispStyle.fullScreen }}>
              Online Lib
            </Typography>
            <Book fontSize="large" sx={{ display: dispStyle.mobScreen }} />

            <IconButton>
              <ExploreOutlined fontSize="large"/>
              <InputLabel sx={{display: dispStyle.fullScreen}}>Browse</InputLabel>
            </IconButton>
          </Left>
            
          <Center>
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }

              placeholder="Search..."
            />
          </Center>
          
          <Right direction="row">
            <InputLabel>Library</InputLabel>
            <IconButton>
              <AccountCircleOutlined fontSize="large" />
            </IconButton>
          </Right>
        </StyledToolbar>
    </AppBar>
  )
}

export default Navbar