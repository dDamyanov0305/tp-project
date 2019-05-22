import React, { Component } from 'react';
import StepperForm from './StepperForm'
import { auth, db, storage } from '../../../config/FirebaseConfig'

class FormBase extends Component{
    constructor(props){
        super(props);
        this.state = {
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
            postalCode: '',
            country: '',
            basket:[],
            purchased:[],
            message:'',
        }
    }
    

    handleSubmit = (e) => {
        const { password, image, avatar, file, color, ...data } = this.state;

        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(cred=>{
                auth.currentUser.sendEmailVerification().then(()=>{
                    db.collection("users").doc(cred.user.uid).set(data);
    
                    if(avatar){
                        storage.ref().child('avatars/'+cred.user.uid).put(this.state.file).then((snapshot)=>{
                            snapshot.ref.getDownloadURL().then(url=>{
                                db.collection("users").doc(cred.user.uid).update({url});
                            })
                        });
                       
                    } 
                    
                })
                
                data.uid=cred.user.uid;
                console.log(data);
                fetch("http://localhost:5000/create_user",{
                    method:"POST",
                    mode:"no-cors",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data)
                }).then(response=>{console.log(response)});
                setTimeout(()=>{this.props.history.push('/');},3500);
            })
            .catch(err=>{this.setState({message:err.message})});

            
    }

    handleChange = (e) =>{
        if(e.target.name==="file"){
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend=()=>{
                this.setState({ file, image : reader.result, avatar:true });
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
        return (
            <StepperForm 
                state={this.state} 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}
            />
        );
    }

}

export default FormBase;