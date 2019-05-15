import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { db, auth } from './config/FirebaseConfig';
import Basket from './components/Basket';
import AlternateBody from './components/AlternateBody';
import FormBase from './components/forms/signUp/FormBase';
import BookForm from './components/forms/book/BookForm';
import SignInForm from './components/forms/signIn/SignInForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import Show from './components/Show';
import Purchased from './components/Purchased';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:null,
      items:[],
    }
  }


  componentDidMount(){

    db.collection('books')
    .orderBy('uploadTime','desc')
    .limit(25)
    .onSnapshot(snapshot=>{

      const docs = snapshot.docs.map(doc=>({...doc.data(),id:doc.id}));
      
      this.setState({items:docs});

    })

    auth.onAuthStateChanged(user=>{

      if(user){

        db.collection('users').doc(user.uid).onSnapshot(snapshot=>{

          const userData={...snapshot.data(), uid:user.uid};

          const {basket}=userData;

          userData.basket=[];
          userData.uploads=[];
          
          basket.forEach(item=>db.collection('books').doc(item).get().then(doc=>userData.basket.push({...doc.data(),id:item})));
          
          db.collection('books').where('uploaderID','==',user.uid).onSnapshot(snapshot=>{

            userData.uploads = snapshot.docs.map(doc=>({...doc.data(),id:doc.id}));

          })  
          

          db.collection('requests').where('owner','==',user.uid).get().then(docs=>{

            userData.requests=[];

            docs.forEach(doc=>{
              
              const req = doc.data();

              db.collection('books').doc(req.item).get().then(item=>{

                db.collection('users').doc(req.buyer).get().then(buyer => {

                  userData.requests.push({ item:{...item.data(),id:item.id}, buyer : {...buyer.data(),uid:req.buyer}, seen:req.seen, status:req.status });

                });

              });

            });

            this.setState({user:userData});

          })

          db.collection('requests').where('buyer','==',user.uid).get().then(docs=>{

            userData.purchased=[];

            docs.forEach(doc=>{

              const req=doc.data()

              db.collection('books').doc(req.item).get().then(item=>{

                db.collection('users').doc(req.owner).get().then(owner=>{

                  userData.purchased.push({item:{...item.data(),id:item.id}, owner:{...owner.data(),uid:req.owner}, status:req.status});

                });

              });

            });

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

    const basket = user.basket.map(item=>item.id);

    this.setState({user});

    db.collection('users').doc(user.uid).update({basket});

  }

  handleFinalize=()=>{

    const purchased = this.state.user.basket.map(item=>item.id);
    
    this.state.user.basket.forEach(item=>{
      db.collection('books').doc(item.id).update({available:false});
      db.collection('requests').doc().set(
        {
          item:item.id,
          owner:item.uploaderID,
          buyer:this.state.user.uid,
          seen:false,
          status:0,
        }
      );

    });

    db.collection('users').doc(this.state.user.uid).update({basket:[],purchased});

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
            <Route path='/b/:id' render={(props)=>(<Show item={state.items.find(e=>e.id===props.match.params.id)} books={state.items} hanhandleBasketChangedle={this.handleBasketChange}/>)}/>
            <Route path='/add' render={()=>(<BookForm uploader={state.user}/>)}/>
            <Route path='/basket' render={()=>(<Basket items={state.user.basket} handleBasketChange={this.handleBasketChange} handleFinalize={this.handleFinalize}/>)}/>
            <Route path='/purchased' render={()=>(<Purchased items={state.user.purchased}/>)}/>
            <Route path='/uploads' render={()=>(<AlternateBody items={state.user.uploads} {...props} handleBasketChange={null}/>)}/>
            <Route path='/' render={(props)=>(<AlternateBody items={items} {...props} handleBasketChange={this.handleBasketChange}/>)}/>
          </Switch>
        </Layout>
      </>
    );
  }
}

export default withRouter(App);
