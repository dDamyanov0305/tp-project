import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AlternateBody from './AlternateBody';

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

const Show = props =>{

    const {item,classes,books}=props;
    const similar = books.filter(book=>(book.author===item.author && book.id!==item.id/*|| book.categories.some(e=>item.categories.includes(e))*/));
    

    return(
        <div>
            <div className={classes.root}>
                <img src={item.url} alt="image" className={classes.image}/>
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
                    <Typography variant="paragraph" className={classes.buttonText}>
                        add to basket
                    </Typography>
                </Button>
            </div>
            <AlternateBody items={similar} handleBasketChange={props.handleBasketChange}/>
        </div>
    );
    
}
Show.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles,{withTheme:true})(Show);