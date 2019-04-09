import React, { Component } from 'react';
import StepperForm from './StepperForm'
import { auth, db, storage } from '../../../config/FirebaseConfig'

class FormBase extends Component{
    state={
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        avatar: false,
        color:'',
        image:'',
        file:'',
        addressLine1: '',
        addressLine2: '',
        city: '',
        region: '',
        zip: '',
        country: '',
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const { 
            password, 
            image, 
            avatar, 
            file,
            color,
            ...rest
        } = this.state;

        let values = {
            ...rest,
            basket:null, 
            purchased:null
        };

        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(cred=>{
                if(avatar){
                    storage.ref().child('avatars/'+cred.user.uid).put(this.state.file).then((snapshot)=>{
                        snapshot.ref.getDownloadURL().then(url=>{
                            cred.user.updateProfile({
                                photoURL:url,
                                displayName:rest.firstName + ' ' + rest.lastName,
                            });
                        })
                    });
                   
                }
                
                db.collection("users").doc(cred.user.uid).set(values);
                
            })

            setTimeout(()=>{this.props.history.push('/');},5000);
            
            
    };

    handleChange = (e) =>{
        e.preventDefault();
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
        return <StepperForm 
                    state={this.state} 
                    handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange}
                />;
    }

}

export default FormBase;