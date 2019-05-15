import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Home from '@material-ui/icons/Home';

const MobileMenu = props =>{

    const { mobileMoreAnchorEl, isMobileMenuOpen, user, history } = props;
    let isUserPresent=Boolean(user);

    if(isUserPresent){
        return (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={props.handleMenuClose}
            >
                <MenuItem onClick={props.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Home />
                    </IconButton>
                    <p>Home</p>
                </MenuItem>
                <MenuItem onClick={props.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <MailIcon />
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem onClick={props.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={props.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>         
            </Menu>
        );
    }
    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={props.handleMenuClose}
        >
            <MenuItem onClick={()=>{history.push('/signIn')}}>
              <p>Log In</p>
            </MenuItem>
            <MenuItem onClick={()=>{history.push('/signUp')}}>
              <p>Sign Up</p>
            </MenuItem>
        </Menu>
    );
}


export default MobileMenu;