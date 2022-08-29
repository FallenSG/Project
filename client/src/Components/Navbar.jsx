import { AppBar, Toolbar, styled, InputBase, Paper, Stack, InputAdornment, Link, IconButton, Menu, MenuItem } from '@mui/material'
import { Explore, AccountCircleSharp, SearchSharp } from '@mui/icons-material'
import { useState } from 'react';

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


function Avatar(){
  const [authToken, setAuthToken] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const profileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id='profileMenu'
      keepMounted={false}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        mt: '45px'
      }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem sx={{ display: dispStyle.mobScreen }}>Library</MenuItem>
      <MenuItem>Sign Out</MenuItem>
    </Menu>
  )

  var element = (
    <IconButton 
      onClick={() => {
        setAuthToken('sampleVal');
      }}
    >
      <AccountCircleSharp fontSize="large" sx={{ color: '#fff' }} />
    </IconButton>
  )
  if(authToken){
    element = (
      <IconButton
        aria-controls='profileMenu'
        aria-haspopup="true"
        onClick={profileMenuOpen}
      >
        <AccountCircleSharp fontSize="large" sx={{ color: '#fff' }} />
      </IconButton>
    )
  }

  return (
    <div>
    {element}
    {renderMenu}
    </div>
  )
}

function Navbar() {
  return (
    <AppBar position="sticky">
        <StyledToolbar>
        <Stack direction="row" spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap"
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

        <Center>
          <InputBase sx={{ color: "#fff", width: '100%', }}
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

        <Avatar />

       </Stack>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar