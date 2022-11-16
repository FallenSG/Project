import { AppBar, Toolbar, styled, InputBase, Paper, Stack, InputAdornment, Link, IconButton } from '@mui/material'
import { Explore, SearchSharp } from '@mui/icons-material'
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
  backgroundColor: "#00000054",
  padding: "0 10px",
  borderRadius: '1200px',
  width: "35%",
  display: "flex",
  justifyContent: "space-between",
}));

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ width: "100vw" }}>
        <StyledToolbar>
        <Stack direction="row" spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
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
				sx={{
					pr: "7%"
				}}
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