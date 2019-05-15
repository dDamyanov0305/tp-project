import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Item from './Item';

const styles = theme =>({
    root:{
        marginTop:56,
        backgroundColor: theme.palette.background.paper,
        display:'flex',
        boxShadow: '3px 3px rgba(255, 105, 135, .3)',
    }
})


const AlternateBody = props =>{
    
    const {classes,items,...rest}=props;

    return(
        <div className={classes.root}>
            {items.map((item,index)=>(
                <Item key={index} item={item} {...rest}/>
            ))}
        </div>
    );
    
}

AlternateBody.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles,{withTheme:true})(AlternateBody);