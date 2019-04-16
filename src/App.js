import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { db, auth, storage } from './config/FirebaseConfig';
import Body from './components/Body';
import FormBase from './components/forms/signUp/FormBase';
import BookForm from './components/forms/book/BookForm';
import SignInForm from './components/forms/signIn/SignInForm'
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      books:[],
      covers:{},
    }
  }

  //everything needs to be moved to express app
  componentDidMount(){    
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users').doc(user.uid).get().then(doc=>{
          this.setState({user:{...doc.data(),uid:user.uid}});
        });
      }
      else{
        this.setState({ user:null });
      }
      
    });

    db.collection('books').orderBy('uploaded_at','desc').onSnapshot(snapshot=>{
      const docs = 
        snapshot.docs
        .map(doc=>({...doc.data()}));
       
      docs.map(doc=>{storage.ref().child('avatars/'+doc.uploader.id).getDownloadURL().then(url=>{doc.uploader.url=url})});
          
      this.setState({books:docs});
    })
  }

  render() {
    const { state, props } = this;
 
    return (
      <>
        <CssBaseline/>
        <Navbar {...props} user={state.user}>
          <Switch>
            <Route path='/signIn' component={SignInForm}/>
            <Route path='/signUp' component={FormBase}/>
            <Route path='/add' component={BookForm}/>
            <Route path='/' render={()=>(
              <Body 
                items={state.books} 
                user={state.user} 
              />
            )}/>
          </Switch>
        </Navbar>
      </>
    );
  }
}

export default withRouter(App);
