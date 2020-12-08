import React,{Component} from 'react';
import Header from '../src/components/Header/Header'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/home/Home'
import About from './components/about/About'
import Me from './components/me/Me'
import New from './components/New/New'
import LoginPage from './components/LoginPage/LoginPage'
import View from './components/View/View'
import Edit from './components/Edit/Edit'
import './App.css';

class App extends Component {
  state={
    logined:false
  }
  componentDidMount(){
    if(localStorage.getItem('user')){
      this.setState({logined:true})
    }
  }
  loginedHandler(){
    this.setState({logined:true})
  }
  render(){
    return (
      <BrowserRouter>
      {this.state.logined?
      <div className="App">
        <Header/>
        <Route path="/"exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/me" component={Me}/>
        <Route path="/new" component={New}/>
        <Route path ="/trip/:tripId" component={View}/>
        <Route path ="/edit/:tripId" component={Edit}/>
      </div>:<LoginPage logedIn={()=>this.loginedHandler()}/>}
      </BrowserRouter>
    );
  }
  
}

export default App;

