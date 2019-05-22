import React from 'react';
import { auth } from '../../config/FirebaseConfig';
import CustomDrawer from './CustomDrawer';
import BackButton from './BackButton';
import Nav from './Nav';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';


class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        open: false,
      }
  }
  

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
    const { user, history } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const NavProps = {
      toggleDrawer:this.toggleDrawer,
      handleMobileMenuOpen:this.handleMobileMenuOpen,
      handleProfileMenuOpen:this.handleProfileMenuOpen,
      isMenuOpen,
      open,
      history,
      user,
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
      user,
      history,
      handleMobileMenuClose:this.handleMobileMenuClose,
      handleMenuClose:this.handleMenuClose,
      handleProfileMenuOpen:this.handleProfileMenuOpen,
    }

    const CustomDrawerProps={
      toggleDrawer:this.toggleDrawer,
      open,
      history,
      user,
    }

    return (
      <div>
        <Nav {...NavProps}/>
        <DesktopMenu {...DesktopMenuProps}/>
        <MobileMenu {...MobileMenuProps}/>
        <CustomDrawer {...CustomDrawerProps}/>
        <BackButton history={history}/>
        {this.props.children}
      </div>
    );
  }
}


export default Layout;