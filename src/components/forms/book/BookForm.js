import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    FormGroup,
    Input,
    InputLabel,
    InputAdornment,
    Paper,
    Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles=theme=>({
    root:{
        marginTop:theme.spacing.unit * 8
    }
});


class BookForm extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            author:'',
            price:'',
            image:'',
            review:'',
            genre:'',
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault();


    }

    handleChange=(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }



    render(){
        const { classes } = this.props;
        return (
            <FormGroup className={classes.root} fullwidth>
                <Grid container direction="row" justify="center" alignItems="center">

                    <Grid item xs="6">
        
                 
                        <InputLabel htmlFor="title"/>
                        <Input 
                            value={this.state.title} 
                            name="title"
                            type="text" 
                            placeholder="Title*"
                            onChange={this.handleChange}
                        />

                        <InputLabel htmlFor="author"/>
                        <Input 
                            value={this.state.author} 
                            name="author"
                            type="text" 
                            placeholder="Author*"
                            onChange={this.handleChange}
                            />

                        <InputLabel htmlFor="review"/>
                        <Input 
                            value={this.state.review}
                            name="review" 
                            type="text" 
                            placeholder="Information about the book content*"
                            onChange={this.handleChange}
                            />

                        <InputLabel htmlFor="price"/>
                        <Input
                            value={this.state.price}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            onChange={this.handleChange}
                        />   

                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
    

}

BookForm.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles)(BookForm);