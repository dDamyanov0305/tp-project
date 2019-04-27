import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ExitToApp, Settings } from '@material-ui/icons';


const DesktopMenu = props =>{

    const { anchorEl, isMenuOpen } = props;

    return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={props.handleMenuClose}
        >
          <MenuItem onClick={props.handleMenuClose}>
            <p>Edit</p>
            <IconButton color="inherit">
              <Settings/>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={props.signOut}>
            <p>Log out</p>
            <IconButton color="inherit">
              <ExitToApp/>
            </IconButton>
          </MenuItem>
        </Menu>
    );
}


export default DesktopMenu;