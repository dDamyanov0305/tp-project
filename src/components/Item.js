import React,{Component} from 'react'
import {Typography, Button} from '@material-ui/core'
import classes from '*.module.scss';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';

const styles = theme =>({
    price:{
        color: "#ab47bc",
    },
    button:{
        backgroundColor: "#00bfa5",
    }
})

const Item = props =>{

    const {item,classes}=props;

    return(
        <div>
            <img src={item.image} alt="item image"/>
            <Typography variant="title" gutterBottom>
                {item.title}
            </Typography>
            <Typography variant="subtitle1">
                {item.author}
            </Typography>
            <Typography variant="title" className={classes.price}>
                {item.author}
            </Typography>
            <Button className={classes.button}>
                {item.price}
            </Button>
        </div>
    );
    
}
Item.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles,{withTheme:true})(Item);