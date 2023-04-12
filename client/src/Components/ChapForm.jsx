import PropTypes from 'prop-types';
import {
    Paper, Snackbar, Alert, Grid,
    Button, CircularProgress, styled, Stack
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';

import PubNavbar from './PubNavbar'
import PubPath from './PubPath'

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
                margin: "normal",
                size: "small",
                variant: "outlined",
                helperText: "Required"
            }
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

const Loading = styled(CircularProgress)({
    color: "grey"
})

function MainContent({ props, setSnackCont }) {
    const { url, getParams, children, buttonText } = props;
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsClicked(true);

        axios.post(url, getParams(), {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((resp) => {
                setSnackCont({ severity: 'success', msg: resp.data, open: true })
                setIsClicked(false);
            })
            .catch(err => {
                setSnackCont({ severity: 'error', msg: err.response.data, open: true })
                setIsClicked(false);
            })
    }

    return (
        <ThemeProvider theme={formTheme}>
            <Paper
                sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 }, backgroundColor: '#f6f7fc' }}
            >
                <PubPath />
                <Stack
                    component="form"
                    autoComplete="off"
                    sx={{ width: { xs: "100%", md: "65%" }, pt: "10px" }}
                    onSubmit={handleSubmit}
                >
                    {children}

                    <Button type='submit' sx={{ mt: 3, mb: 2 }} disabled={isClicked}>
                        {isClicked ? <Loading /> : buttonText}
                    </Button>
                </Stack>
            </Paper>
        </ThemeProvider>
    )
}

function PublishForm(props) {
    const [snackCont, setSnackCont] = useState({ open: false, msg: "Nothing to see here!!", severity: "warning" })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackCont({ open: false, msg: "Closed Now!", severity: "error" });
    }

    return (
        <>
            <PubNavbar />
            <Snackbar
                open={snackCont.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackCont.msg}
                sx={{ width: { sm: "45vw" } }}
            >
                <Alert onClose={handleClose} severity={snackCont.severity} sx={{ width: '100%' }}>
                    {snackCont.msg}
                </Alert>
            </Snackbar>

            <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item xs={11}>
                    <MainContent props={props} setSnackCont={setSnackCont} />
                </Grid>
            </Grid>
        </>
    )
}

PublishForm.propTypes = {
    children: PropTypes.node,
};

export default PublishForm;