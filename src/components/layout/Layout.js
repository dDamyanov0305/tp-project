import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { auth } from '../../config/FirebaseConfig';
import classNames from 'classnames';
import CustomDrawer from './CustomDrawer';
import BackButton from './BackButton';
import Nav from './Nav';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import drawerWidth from '../../config/DrawerWidth';


const styles = theme => ({
  root: {
    display: 'flex',
    //backgroundColor: '#f5f5f5',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

});


class Layout extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  toggleDrawer = () => {
    this.setState(state=>({open:!state.open}));
  };

  signOut = () =>{
    this.handleMenuClose();
    auth.signOut();
    this.setState({open:false});
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, open } = this.state;
    const { classes, user, history } = this.props;
    const isUserPresent = Boolean(user);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const NavProps = {
      toggleDrawer:this.toggleDrawer,
      handleMobileMenuOpen:this.handleMobileMenuOpen,
      handleProfileMenuOpen:this.handleProfileMenuOpen,
      isMenuOpen,
      isUserPresent,
      open,
      history
    };

    const DesktopMenuProps={
      signOut:this.signOut,
      handleMenuClose:this.handleMenuClose,
      anchorEl,
      isMenuOpen,
    }

    const MobileMenuProps={
      mobileMoreAnchorEl,
      isMobileMenuOpen,
      isUserPresent,
      history,
      handleMobileMenuClose:this.handleMobileMenuClose,
      handleMenuClose:this.handleMenuClose,
      handleProfileMenuOpen:this.handleProfileMenuOpen,
    }

    const CustomDrawerProps={
      open,
      history,
      user,
      isUserPresent,
    }

    return (
      <div className={classes.root}>
        <Nav {...NavProps}/>
        <DesktopMenu {...DesktopMenuProps}/>
        <MobileMenu {...MobileMenuProps}/>
        <CustomDrawer {...CustomDrawerProps}/>
        <div className={classNames(classes.content, {[classes.contentShift]: open})}>
        <BackButton history={history}/>
        {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);