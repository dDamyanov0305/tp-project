import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';

const styles = theme =>({
    root:{
        backgroundColor: theme.palette.background.paper,
        heigth:100,
        overflowX: "scroll",
    }
})


const AlternateBody = props =>{
    
    const {classes,items}=props;

    return(
        <div className={classes.root}>
            {items.map((item,index)=>(
                <Item key={index} item={item}/>
            ))}
        </div>
    );
    
}

AlternateBody.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles,{withTheme:true})(AlternateBody);