import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';


const styles = theme =>({
    root:{
        padding:10
    },
    image:{
        width:100,
    },
    price:{
        color: "#ff0072",
    },
    button:{
        backgroundColor: "#10bbd5",
    },
    buttonText:{
        marginLeft:10,
        marginRight:10,
        color:theme.palette.background.paper,
    }
})

const Item = props =>{

    const {item,classes}=props;

    return(
        <div className={classes.root}>
            <img src={item.image} alt="book cover" className={classes.image} onClick={()=>{props.history.push('/b/'+item.id)}}/>
            <Typography variant="title">
                {item.title}
            </Typography>
            <Typography variant="subtitle1">
                {item.author}
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
                {item.price}$
            </Typography>
            <Button className={classes.button} onClick={()=>{props.handleBasketChange(item,"A")}}>
                <Typography  className={classes.buttonText}>
                    add to basket
                </Typography>
            </Button>
        </div>
    );
    
}
Item.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles,{withTheme:true})(Item);