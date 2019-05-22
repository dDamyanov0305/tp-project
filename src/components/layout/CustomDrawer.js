import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Avatar, 
    Typography, 
    Button, 
    List, 
    ListItem, 
    ListItemIcon,
    Drawer,
} from '@material-ui/core';
import { 
    People, 
    Chat, 
    FolderSpecial,
    ShoppingBasket,
    CollectionsBookmark
} from '@material-ui/icons'
import drawerWidth from '../../config/DrawerWidth';

const styles = theme =>({
    drawer: {
        color: theme.palette.background.paper,
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: 'linear-gradient(-45deg, #aa00ff 30%, #512da8 90%)',
    },
    avatar:{
        height: 110,
        width: 110,
        marginTop: 60,
        marginBottom: 5,
    },
    button:{
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: "#00bfa5",
    },
});

const CustomDrawer = props =>{

        const { classes, user, history, open } = props;
        let isUserPresent = Boolean(user);

        const handleClick=(url)=>{
            history.push(url);
            props.toggleDrawer();
        }
        
        return(
            <Drawer 
                anchor="left" 
                open={open}
                onClose={props.toggleDrawer} 
                className={classes.drawer}
                classes={{paper:classes.drawerPaper}}
            >
                {isUserPresent&&
                <div className={classes.root}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs>
                            <Avatar src={user.url}className={classes.avatar}/>            
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h6" className={classes.username} color="inherit">
                            {`${user.fname||user.firstName} ${user.lname||user.lastName}`} 
                            </Typography>            
                        </Grid>
                        <Grid item xs>
                            <Button 
                                variant="text" 
                                color="inherit" 
                                className={classes.button}
                                onClick={()=>{handleClick('/new')}}
                            >
                                add book
                            </Button>      
                        </Grid>
                    </Grid>

                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <Typography variant="h6"  color="inherit">
                                Subscriptions
                            </Typography>     
                        </ListItem>
                        <ListItem button onClick={()=>{handleClick('/uploads')}}> 
                            <ListItemIcon>
                                <FolderSpecial/>
                            </ListItemIcon>                    
                            <Typography variant="h6"  color="inherit">
                                Uploads
                            </Typography>     
                        </ListItem>
                        <ListItem button onClick={()=>{handleClick('/purchases')}}> 
                            <ListItemIcon>
                                <CollectionsBookmark/>
                            </ListItemIcon>                    
                            <Typography variant="h6"  color="inherit">
                                Purchases
                            </Typography>     
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon >
                                <Chat/>
                            </ListItemIcon>
                            <Typography variant="h6" color="inherit">
                                Chats
                            </Typography>     
                        </ListItem>
                        <ListItem button onClick={()=>{handleClick('/basket')}}>
                            <ListItemIcon >
                                <ShoppingBasket/>
                            </ListItemIcon>
                            <Typography variant="h6" color="inherit">
                                Basket
                            </Typography>     
                        </ListItem>
                    </List>
                </div>}
            </Drawer>
        );
}

CustomDrawer.propTypes={
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomDrawer);