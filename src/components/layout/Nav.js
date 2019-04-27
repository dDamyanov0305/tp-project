import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import drawerWidth from '../../config/DrawerWidth';

const styles=theme=>({
    appBar: {
        boxShadow: 'none',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      grow: {
        flexGrow: 1,
      },
      button: {
        margin: theme.spacing.unit,
        boxShadow: 'none'
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit,
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 120,
          '&:focus': {
            width: 320,
          },
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
});


const Nav = props =>{

    const { classes, open, history, isUserPresent, isMenuOpen } = props;

    return(

        <AppBar 
          position="fixed" 
          color='default' 
          className={classNames(classes.appBar, {[classes.appBarShift]: open})}
        >
          <Toolbar>

            {isUserPresent&&<IconButton 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="Open drawer"
                onClick={props.toggleDrawer}  
              >
              <MenuIcon />
            </IconButton>}
            
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Book Marketplace
            </Typography>
            
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
              
            {isUserPresent&&<div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={props.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>}
              
            {!isUserPresent&&<div className={classes.sectionDesktop}>
              <Button onClick={()=>{history.push('/signIn')}} className={classes.button}>
                Log In     
              </Button>
              <Button onClick={()=>{history.push('/signUp')}} variant="outlined" className={classes.button}>
                Sign Up
              </Button>
            </div>}
              
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={props.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>

          </Toolbar>
          <Divider/>
        </AppBar>
    );
}

Nav.propTypes={
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Nav);