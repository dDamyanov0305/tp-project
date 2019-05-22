import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

const styles=()=>({
    backButton:{
        marginLeft: 35,
        position:'fixed',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: '#bdbdbd',
    },
    backIcon:{
        marginLeft: -6,
        width:40,
        height:40,
    },
    backText:{
        fontSize: 20,
    }
});

const BackButton = props =>{

    const { classes, history } = props;

    if(history.location.pathname!=='/'){
        return (
            <Fab variant="extended" className={classes.backButton} onClick={history.goBack}>
                <KeyboardArrowLeft className={classes.backIcon}/>
                <Typography color='inherit' className={classes.backText}>
                back
                </Typography>
            </Fab>
        );
    }
    return null;
}

BackButton.propTypes={
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(BackButton);