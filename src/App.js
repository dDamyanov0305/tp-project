import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { db, auth, storage } from './config/FirebaseConfig';
import Basket from './components/Basket';
import AlternateBody from './components/AlternateBody';
import FormBase from './components/forms/signUp/FormBase';
import BookForm from './components/forms/book/BookForm';
import SignInForm from './components/forms/signIn/SignInForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import Show from './components/Show';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:null,
      items:[],
    }
    this.props.history.replace('/');
  }


  componentDidMount(){

    db.collection('books')
    .orderBy('uploaded_at','desc')
    .limit(25)
    .onSnapshot(snapshot=>{

      const docs = snapshot.docs.map(doc=>({...doc.data(),id:doc.id}));

      docs.forEach(doc=>{storage.ref().child('avatars/'+doc.uploader.id).getDownloadURL().then(url=>{doc.uploader.url=url})});
      
      this.setState({items:docs});

    })

    auth.onAuthStateChanged(user=>{

      if(user){

        db.collection('users').doc(user.uid).onSnapshot(snapshot=>{

          const userData={...snapshot.data(), uid:user.uid};

          userData.basket=this.state.items.filter(item=>userData.basket.includes(item.id));

          userData.purchased=this.state.items.filter(item=>userData.purchased.includes(item.id));

          userData.uploads=this.state.items.filter(item=>item.uploader.id===user.uid);          

          /*userData.basket.forEach(itemID=>db.collection('books').doc(itemID).get().then(doc=>itemID=doc.data()));

          userData.purchased = userData.purchased.map(itemID=>db.collection('books').doc(itemID).get().then(doc=>doc.data()));

          db.collection('books').where('uploader.id','==',user.uid).onSnapshot(snapshot=>{

            userData.uploads = snapshot.docs.map(doc=>doc.data());

          })*/
          

          db.collection('requests').where('owner','==',user.uid).get().then(docs=>{

            userData.requests=[];

            docs.forEach(doc=>{
              
              const req = doc.data();

              const item = this.state.items.find(item=>item.id===req.item);

              db.collection('users').doc(req.buyer).get()
              .then(doc => { userData.requests.push({ item, buyer : doc.data(), seen:req.seen, aprooved:req.aprooved })});

            })

            this.setState({user:userData});

          })

        });
        
      }
      else{

        this.setState({ user:null });
        
      }
      
    });
    
  }


  handleBasketChange=(item,action)=>{

    const {user}=this.state;

    user.basket = action==="R" ? user.basket.filter(e=>e !== item) : [...user.basket,item];

    this.setState({user});

    const basket = user.basket.map(item=>item.id);

    db.collection('users').doc(user.uid).update({basket});

  }

  handleFinalize=()=>{

    const purchased = this.state.user.basket.map(item=>item.id);
    
    this.state.user.basket.forEach(item=>{
      db.collection('books').doc(item.id).update({available:false});
      db.collection('requests').doc().set(
        {
          item:item.id,
          owner:item.uploader.id,
          buyer:this.state.user.uid,
          seen:false,
          aprooved:false,
        }
      );

    });

    const basket = [];
    db.collection('users').doc(this.state.user.uid).update({basket,purchased});

  }


  render() {
    const { state, props } = this;
    const items = state.items.filter(item=>item.available);
 
    return (
      <>
        <CssBaseline/>
        <Layout {...props} user={state.user}>
          <Switch>
            <Route path='/signIn' component={SignInForm}/>
            <Route path='/signUp' component={FormBase}/>
            <Route path='/b/:id' render={(props)=>{
              return<Show item={state.items.find(e=>e.id===props.match.params.id)} books={state.items}/>
            }}/>
            <Route path='/add' render={()=>(<BookForm uploader={state.user}/>)}/>
            <Route path='/basket' render={()=>(<Basket items={state.user.basket} handleBasketChange={this.handleBasketChange} handleFinalize={this.handleFinalize}/>)}/>
            <Route path='/uploads' render={()=>(<AlternateBody items={state.user.uploads} {...props} handleBasketChange={null}/>)}/>
            <Route path='/' render={(props)=>(<AlternateBody items={items} {...props} handleBasketChange={this.handleBasketChange}/>)}/>
          </Switch>
        </Layout>
      </>
    );
  }
}

export default withRouter(App);
