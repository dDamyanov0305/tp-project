import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Item from '../Item';
import {root} from '../../config/css';

const styles = theme =>({
    root:{
        ...root,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0.1rem 0.1rem 0.2rem rgba(0,0,0,0.1);',
        display:'flex'
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