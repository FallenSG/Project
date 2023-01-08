import { AppBar, Toolbar, styled, Paper, Stack, Link, IconButton } from '@mui/material'
import { Explore } from '@mui/icons-material'

import SearchBar from './SearchBar';
import Avatar from './Avatar';

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
  // backgroundColor: "#00000054",
  padding: "0 10px",
  borderRadius: '1200px',
  width: "35%",
  display: "flex",
  justifyContent: "space-between",
}));

function Navbar() {
  return (
    <AppBar position="sticky">
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
              sx={{ fontSize: 24 }}
            > 
              {'Project'}
            </Link>

            <IconButton>
              <Explore fontSize="large" sx={{ color: "white" }}/>
            </IconButton>
          </Stack>

          <Center> <SearchBar /> </Center>
        
        <Stack 
          direction="row" 
          spacing={1}
          sx={{ pr: "7%" }}
        >
          <Link 
            variant="h6"
            underline="none"
            color="primary"
            sx={{ padding: 1, display: dispStyle.fullScreen }}
            href="/library"
          >
            Library
          </Link> 

          <Avatar dispStyle={dispStyle}/> 

        </Stack>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar