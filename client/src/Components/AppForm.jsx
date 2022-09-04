import PropTypes from 'prop-types';
import AppFormNav from './AppFormNav'
import Navbar from './Navbar'
import { Box, Paper, Container, Typography } from '@mui/material';
import { GutterBottom } from '../Components/GutterDivider'
import { createTheme, ThemeProvider } from '@mui/material'

const formTheme = createTheme({
    palette: {
        primary: {
            main: "#ff3366",
        },
        secondary: {
            main: "#0f0f0f"
        },
    },
    typography: {
        h3: {
            textTransform: 'uppercase',
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: 42,
            fontWeight: 700,
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                required: true,
                fullWidth: true,
                margin: "normal",
                size: "large",
                variant: "outlined",
                helperText: "Required"
            },
        },

        MuiLink: {
            defaultProps: {
                color: "secondary",
                align: "center"
            },
            style: {
                textDecorationColor: "grey"
            }
        },

        MuiButton: {
            defaultProps: {
                color: "primary",
                variant: "contained",
                type: "submit",
                fullWidth: true,
                size: "large",
            },
        },

        MuiScopedCssBaseline: {
            styleOverrides: {
                span: {
                    height: "4px",
                    width: "55px",
                    display: "block",
                    margin: "8px auto 16px",
                    backgroundColor: "#ff3366"
                }
            }
        }
    }
});

function MainContent(props) {
    const { title, underTitle, children, bottomPart } = props;
    return (
        <ThemeProvider theme={formTheme}>
            <Container maxWidth="sm">
                <Box sx={{ mt: 7, mb: 12 }}>
                    <Paper
                        background="light"
                        sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 }, backgroundColor: '#fff5f8' }}
                    >
                        <Typography variant="h3" marked="center" align="center">
                            {title}
                        </Typography>

                        <GutterBottom />

                        <Typography variant="body2" align="center">
                            {underTitle}
                        </Typography>
                        {children}

                        <Typography variant="body1" align="center">
                            {bottomPart}
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

function AppForm(props) {
    const { navbar } = props;
    const elem = {
        'notAuth': <><AppFormNav /> <MainContent {...props} /></>,
        'auth': <><Navbar /> <MainContent {...props} /></>,
        'non': <><MainContent {...props} /></>,
    }
   
    return ( elem[navbar] );
}

AppForm.propTypes = {
    children: PropTypes.node,
};

export default AppForm;