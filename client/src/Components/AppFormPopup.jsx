import { 
    styled, Alert, Stack, Snackbar 
} from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom';

const StyledAlert = styled(Alert)({
    padding: "8px 8px",
    fontSize: 15,
    fontWeight: 400,
    borderRadius: "4px 4px 0 0"
})


export default function AppFormNav(props){
    const { banner, setBanner } = props;
    const navg = useNavigate();

    const [query] = useSearchParams();
    const path = query.get('fromUrl');

    const handleClose = () => {
        if(banner.severity === 'success') navg(path === null ? '/' : path);
        setBanner({ open: false, severity: "warning", msg: "Nothing here" })
    }

    return (
        <Snackbar
            open={banner.open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={handleClose}
            message={banner.msg}
            sx={{ width: { sm: "45vw" } }}
        >
            <StyledAlert onClose={handleClose} severity={banner.severity} sx={{ width: '100%' }}>
                {banner.msg}
            </StyledAlert>
        </Snackbar>
    )
}
