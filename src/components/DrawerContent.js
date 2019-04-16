import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Button, List, ListItem, ListItemIcon} from '@material-ui/core';
import { People, Chat, FolderSpecial} from '@material-ui/icons'

const styles = theme =>({
    root:{
        color: theme.palette.background.paper,
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

const DrawerContent = props =>{

        const { classes, user, history } = props;
        return(
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
                            onClick={()=>{history.push('/add')}}
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
                    <ListItem button> 
                        <ListItemIcon>
                            <FolderSpecial/>
                        </ListItemIcon>                    
                        <Typography variant="h6"  color="inherit">
                            Your adds
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
                </List>
            </div>
        );
}

DrawerContent.propTypes={
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DrawerContent);