import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    FormGroup,
    Input,
    InputLabel,
    InputAdornment,
    Grid,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { db, storage } from '../../../config/FirebaseConfig';

const styles=theme=>({
    root:{
        marginTop:theme.spacing.unit * 8
    },
    input:{
        display:'none',
    },
});

class BookForm extends Component{
    constructor(props){
        super(props);
        this.state={
            format:'',
            pages:'',
            weigth:'',
            dimensions:'',
            language:'',
            title:'',
            author:'',
            price:'',
            image:null,
            file:'',
            review:'',
            categories:'',
            uploader:{
                id:this.props.uploader.uid,
                name:`${this.props.uploader.firstName} ${this.props.uploader.lastName}`
            },
            available:true,
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let { image, file, categories, dimensions, ...rest } = this.state;

        categories=categories.split(",");
        dimensions=dimensions.split("x");

        storage.ref().child('books/'+rest.title).put(file).then(snapshot=>{
            snapshot.ref.getDownloadURL().then(url=>{
                db.collection("books").doc().set({
                    ...rest,
                    categories,
                    dimensions,
                    url,
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
        const { state, handleChange } = this;

        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className={classes.root} >
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={6}>
                            <InputLabel htmlFor="title"/>
                            <Input
                                required 
                                value={state.title} 
                                name="title"
                                type="text" 
                                placeholder="Title*"
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="author"/>
                            <Input
                                required 
                                value={state.author} 
                                name="author"
                                type="text" 
                                placeholder="Author*"
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="review"/>
                            <Input 
                                required
                                value={state.review}
                                name="review" 
                                type="text" 
                                placeholder="Information about the book content*"
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="price"/>
                            <Input
                                required
                                value={state.price}
                                type="number"
                                name="price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={handleChange}
                            />  
                            <InputLabel htmlFor="categories"/>
                            <Input
                                required 
                                value={state.categories}
                                name="categories" 
                                type="text" 
                                placeholder="fantasy,horror,..."
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="format"/>
                            <Input
                                required 
                                value={state.format}
                                name="format" 
                                type="text" 
                                placeholder="width x heigth x thicc"
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="weigth"/>
                            <Input
                                required 
                                value={state.weigth}
                                name="weigth" 
                                type="text" 
                                placeholder="500g"
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="pages"/>
                            <Input
                                required 
                                value={state.pages}
                                name="pages" 
                                type="number" 
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="language"/>
                            <Input
                                required 
                                value={state.language}
                                name="language" 
                                type="text" 
                                onChange={handleChange}
                            />       
                            <Input 
                                required 
                                type="file"
                                name="file" 
                                inputRef={input=>(this.input=input)} 
                                onChange={handleChange}
                                className={classes.input}
                            />
                            <Button variant="contained" color="primary" onClick={()=>{this.input.click()}}>
                                Choose image
                            </Button>
                            {state.image&&<img src={state.image} alt='sum fuk?'/>}
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

export default withStyles(styles,{withTheme:true})(BookForm);