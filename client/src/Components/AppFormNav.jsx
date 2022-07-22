import { AppBar, Box, Link, styled, Toolbar } from "@mui/material";

const StyledToolbar = styled(Toolbar)( ({ theme }) => ({
    height: 64,
    [theme.breakpoints.up('sm')]: {
        height: 70,
    },
    backgroundColor: theme.palette.navbar.main
}));

const rightLink = {
    fontSize: 20,
    color: 'white',
    ml: 3,
};

export default function AppFormNav(){
    return (
        <AppBar position="sticky">
           <StyledToolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />
                <Link
                    variant="h6"
                    underline="none"
                    color="inherit"
                    href="/"
                    sx={{ fontSize: 24 }}
                >
                    {'Project'}
                </Link>
        
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        href="/sign_in"
                        sx={rightLink}
                    >
                        {'Sign In'}
                    </Link>
                    <Link
                        variant="h6"
                        underline="none"
                        href="/sign_up"
                        sx={{ ...rightLink, color: 'primary.main' }}
                    >
                        {'Sign Up'}
                    </Link>
                </Box>
           </StyledToolbar>
        </AppBar>
    )
}