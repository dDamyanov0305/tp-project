import React, { Component, PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { db, auth, storage } from './config/FirebaseConfig';
import Body from './components/Body';
import FormBase from './components/forms/signUp/FormBase';
import BookForm from './components/forms/book/BookForm';
import SignInForm from './components/forms/signIn/SignInForm'
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      user:null,
      items:[],
    }
  }


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
      const docs = snapshot.docs.map(doc=>({...doc.data()}));
      docs.forEach(doc=>{storage.ref().child('avatars/'+doc.uploader.id).getDownloadURL().then(url=>{doc.uploader.url=url})});  
      this.setState({items:docs});
    })
  }

  render() {
    const { state, props } = this;
 
    return (
      <>
        <CssBaseline/>
        <Layout {...props} user={state.user}>
          <Switch>
            <Route path='/signIn' component={SignInForm}/>
            <Route path='/signUp' component={FormBase}/>
            <Route path='/add' component={BookForm}/>
            <Route path='/' render={()=>(
              <Body items={state.items} user={state.user}/>
            )}/>
          </Switch>
        </Layout>
      </>
    );
  }
}

export default withRouter(App);
