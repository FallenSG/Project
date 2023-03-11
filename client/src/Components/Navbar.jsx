import { AppBar, Toolbar, styled, InputBase, InputAdornment, Paper, Stack, Link, IconButton } from '@mui/material'
import { Explore, SearchSharp, LeaderboardSharp } from '@mui/icons-material'
import { useState } from 'react'

import Avatar from './Avatar';
import SearchBar from './SearchBar'

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

const StyledToolbar = styled(Toolbar)( ({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.navbar.main
}));

const Center = styled(Paper)(({ theme }) => ({
  backgroundColor: "#00000054",
  padding: "0 10px",
  borderRadius: '1200px',
  width: "35%",
  display: "flex",
  justifyContent: "space-between",
}));

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <AppBar position="sticky" sx={{ width: isVisible? '100%': '0%' }}>
          <StyledToolbar>
            <Stack direction="row" spacing={1}
              sx={{
                display: "flex",
                alignItems: "center",
                pl: "7%"
              }}
            >
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ fontSize: 24, outline: "none" }}
              > 
                {'Project'}
              </Link>

              <IconButton>
                <Explore fontSize="large" sx={{ color: "white" }}/>
              </IconButton>

              {/* <IconButton>
                <LeaderboardSharp fontSize="large" sx={{ color: "white" }} />
              </IconButton> */}
            </Stack>

          <Center onClick={() => setIsVisible((prev) => !prev)}> 
            <InputBase 
                sx={{ color: "#fff", width: '100%', }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchSharp sx={{ color: "#fff" }} />
                  </InputAdornment>
                }
                placeholder="Search..."
              />
          </Center>
          
          <Stack 
            direction="row" 
            spacing={1}
            sx={{ pr: "7%" }}
          >
            <Link 
              variant="h6"
              underline="none"
              color="primary"
              sx={{ padding: 1, display: dispStyle.fullScreen, outline: "none" }}
              href="/library"
            >
              Library
            </Link> 

            <Avatar dispStyle={dispStyle}/> 

          </Stack>
        </StyledToolbar>
      </AppBar>

      <AppBar position="sticky" sx={{ width: isVisible? '0%': '100%', display: isVisible ? 'none' : 'block' }}>
        <StyledToolbar sx={{ justifyContent: "center" }}>
          <Center 
            sx={{ width: { sm: "50%", xs: "100%" }, backgroundColor: "#fff" }}
          > 
            <SearchBar setIsVisible={setIsVisible}  /> 
          </Center>
        </StyledToolbar>
      </AppBar>
    </>
  )
}

export default Navbar