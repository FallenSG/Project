import { Menu, MenuItem, IconButton, ListItemIcon, Avatar as AvatarBlock, Divider } from '@mui/material'
import { AccountCircleSharp, Logout, LibraryBooks, Create, LockReset } from '@mui/icons-material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Avatar({ dispStyle }) {
    const nav = useNavigate();
    const [ user, setUser ] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const profileMenu = async (event) => {
        const eventTarget = event.currentTarget;
        if(Object.keys(user).length) return setAnchorEl(eventTarget);
        
        axios.get('/user')
            .then(resp => {
                if(resp.status === 200){
                    setUser(resp.data);
                    setAnchorEl(eventTarget);
                }
            })
            .catch(err => nav('/sign_in'));
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        setAnchorEl(null);
        axios.post('/sign_out');
        setUser({});
    }

    const handleProfile = () => {
        nav('/profile');
    }

    const handleCreate = () => {
        nav('/createBook');
    }

    const handleLib = () => {
        nav('/library');
    }

    const handleReset = () => {
        nav('/reset-password');
    }

    return (
        <>
            <IconButton
                aria-controls='profileMenu'
                aria-haspopup="true"
                onClick={profileMenu}
            >
                <AccountCircleSharp fontSize="large" sx={{ color: '#fff' }} />
            </IconButton>

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
                sx={{ mt: '45px', width: "25vw" }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        '& .MuiAvatar-root': {
                            bgcolor: "#25262f",
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleProfile}>
                        <ListItemIcon> 
                            <AvatarBlock fontSize="small">{
                                Object.keys(user).length ? user.username[0].toUpperCase() : ""
                            }</AvatarBlock> 
                        </ListItemIcon>
                        {user.username}
                </MenuItem>

                <Divider />
                
                <MenuItem sx={{ display: dispStyle.mobScreen }} onClick={handleLib}>
                    <ListItemIcon> <LibraryBooks fontSize="small" /> </ListItemIcon>
                    Library
                </MenuItem>
                    
                <MenuItem onClick={handleCreate}>
                    <ListItemIcon> <Create fontSize="small" /> </ListItemIcon>
                    Publish Your Work
                </MenuItem>

                <MenuItem onClick={handleReset}>
                    <ListItemIcon> <LockReset fontSize="small" /> </ListItemIcon>
                    Reset Password
                </MenuItem>

                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon> <Logout fontSize="small" /> </ListItemIcon>
                    Sign Out
                </MenuItem>
            </Menu> 
        </>
      
    )
}
