import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    FormGroup,
    Input,
    InputLabel,
    InputAdornment,
    Paper,
    Grid,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { db, storage } from '../../../config/FirebaseConfig';

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
            file:'',
            review:'',
            genre:'',
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const {image,file,...rest} = this.state;

        storage.ref().child('books/'+this.state.title).put(this.state.file).then(snapshot=>{
            snapshot.ref.getDownloadURL().then(url=>{
                
                db.collection("books").doc().set({
                    ...rest,
                    url,
                    available:true,
                    uploader:{
                        id:'id',
                        name:'name'
                    },
                    uploaded_at: new Date(),
                });
                 
            })
        });
        
    }
    
    handleChange = (e) =>{
        if(e.target.name==="file"){
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend=()=>{
                this.setState({ file, image : reader.result });
            }

            if(file){
                reader.readAsDataURL(file);
            }
            
        }
        else{
            this.setState({[e.target.name]:e.target.value});
        }
    }


    render(){
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className={classes.root} fullwidth>
                    <Grid container direction="row" justify="center" alignItems="center">

                        <Grid item xs="6">
                    
                            <InputLabel htmlFor="title"/>
                            <Input
                                required 
                                value={this.state.title} 
                                name="title"
                                type="text" 
                                placeholder="Title*"
                                onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="author"/>
                            <Input
                                required 
                                value={this.state.author} 
                                name="author"
                                type="text" 
                                placeholder="Author*"
                                onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="review"/>
                            <Input 
                                required
                                value={this.state.review}
                                name="review" 
                                type="text" 
                                placeholder="Information about the book content*"
                                onChange={this.handleChange}
                            />

                            <InputLabel htmlFor="price"/>
                            <Input
                                required
                                value={this.state.price}
                                type="text"
                                name="price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={this.handleChange}
                            />  

                            <InputLabel htmlFor="genre"/>
                            <Input
                                required 
                                value={this.state.genre}
                                name="genre" 
                                type="text" 
                                placeholder="Genre*"
                                onChange={this.handleChange}
                            /> 

                            <Input 
                                required 
                                type="file"
                                name="file" 
                                inputRef={input=>(this.input=input)} 
                                onChange={this.handleChange}
                            />

                            <Button variant="contained" color="primary" onClick={()=>{this.input.click()}}>
                                Choose image
                            </Button>

                            <img src={this.state.image} alt='sum fuk?'/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>

                        </Grid>
                    </Grid>
                </FormGroup>
            </form>
        );
    }
    

}

BookForm.propTypes={
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles)(BookForm);