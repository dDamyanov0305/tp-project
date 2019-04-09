import React from 'react';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import {Avatar, Button, Input} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const getRandomColor=()=>Math.floor(Math.random()*16777215).toString(16);

const color=`#${getRandomColor}`;

let styles=theme=>({
    avatarBefore:{
        width:200,
        height:200,
        backgroundColor:color,
    },
    input:{
        display:"none",
    },

});

class AvatarForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            color:color,
        }
    }

    

    render(){

        const { classes, state }=this.props;
    
        return(
            <Grid container direction="column" alignItems="center" spacing={24}>
                <Grid item xs={12}>              
                    <Avatar src={state.image} className={classes.avatarBefore}>
                        <Typography variant="h1" color="inherit">
                            {state.firstName&&state.firstName[0]}
                        </Typography>
                    </Avatar>
                </Grid>
                <Grid item xs={12}>
                    <Input 
                        required 
                        className={classes.input} 
                        type="file"
                        name="file" 
                        inputRef={input=>(this.input=input)} 
                        onChange={this.props.handleChange}
                    />
                    <Button variant="contained" color="primary" onClick={()=>{this.input.click()}}>
                        Choose image
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary" onClick={getRandomColor}>
                        Get random color
                    </Button>
                </Grid> 
            </Grid>    
        );
    }

}

AvatarForm.propTypes={
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AvatarForm);