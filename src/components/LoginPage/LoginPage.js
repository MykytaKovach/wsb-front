import React , {Component} from 'react'
import styles from './LoginPage.module.css'
import Aux from '../../hoc/auxilary'
import Plane from '../loading/Plane'
import axios from './../../axios'
import Error from '../../hoc/error/error'


class Home extends Component {
state={
    loading:false,
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    companyName:'',
    role:'',
    companyAccount:false,
    error:null

}



changeHandler(e){
  e.target.type !== "checkbox"? 
  this.setState({[e.target.name]:e.target.value}):
  this.setState({[e.target.name]:e.target.checked})
}
buttonClickHandler(e){
    e.persist()
    e.preventDefault()
    this.setState({whatToShow:e.target.textContent})
}
loginHandler(e){
    e.preventDefault();
    this.setState({loading:true})
    axios.post('https://wsb-backend.herokuapp.com/login',{

      "email":this.state.email,
      "password":this.state.password
      
      }).then(res=>{
      if(res.data.error){
       return this.errorHandler(res.data.error)
      }
      localStorage.setItem('user',JSON.stringify(res.data.user))
      localStorage.setItem('token',res.data.token)
      this.setState({loading:false})
        this.props.logedIn()
    }).catch (er=>{console.log(er.response.data)
    return this.errorHandler("Something went wrong")})
    
}

registerHandler(e){
  e.preventDefault()
  let data={}
  this.setState({loading:true})
 this.state.companyAccount?
    data = {
    email:this.state.email,
    password:this.state.password,
    firstName:this.state.firstName,
    lastName: this.state.lastName,
    role:this.state.role?"owner":"employee",
    companyName:this.state.companyName}
      :
    data={
      email:this.state.email,
      password:this.state.password,
      firstName:this.state.firstName,
      lastName: this.state.lastName,
  
    }
  
  axios.post('https://wsb-backend.herokuapp.com/users',data).then(res=>{
    console.log(res)
    if(res.data.errors){
      return this.errorHandler(res.data.errors.message)
     }
     this.setState({loading:false})
     
    localStorage.setItem('user',JSON.stringify(res.data.user))
    localStorage.setItem('token',res.data.token)
    this.props.logedIn()
    
    }).catch(er=>{
      console.log(er.response.data)
      return this.errorHandler(er.response.data.message)
    })


}
errorHandler(msg){
  this.setState({error: msg,loading:false})
  setTimeout(()=>{
      this.setState({error:undefined})
  },3000)
}
render(){
    let form=<Aux>
        <button className="btn btn-primary" onClick={(e)=>this.buttonClickHandler(e)}>Log In</button>
        <div className={styles.SomeDiv}><hr/><p>OR</p><hr/></div>
        <button className="btn btn-primary" onClick={(e)=>this.buttonClickHandler(e)}>Sign In</button>
        </Aux>
    
    if(this.state.whatToShow==='Log In'){
        form = <form onSubmit={(e)=>this.loginHandler(e)}>
            <h5>Log In an existing account</h5>
            {<Error msg = {this.state.error} />}
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange={(e)=>this.changeHandler(e)}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label >Password</label>
          <input type="password" name="password" className="form-control"  placeholder="Password" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className="form-group form-check">
          
        </div>
        <button type="submit" className="btn btn-primary" >Log In</button>
        <p>Or you can <span onClick={(e)=>this.buttonClickHandler(e)} className={styles.Link}>Sign In</span> a new account</p>
      </form>
    } else if (this.state.whatToShow==='Sign In'){
        form = <form onSubmit={(e)=>this.registerHandler(e)}>
            <h5>Create new Account</h5>
            {<Error msg = {this.state.error} />}
            <div className="form-group">
            <label >Fill in your first name</label>
          <input type="text" className="form-control"  name="firstName"placeholder="John Doh" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className="form-group">
        <label >Fill in your last name</label>
          <input type="text" className="form-control"  name="lastName"placeholder="John Doh" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className={`form-group ${styles.checkBox}`}>
        <label >Are you working for a company?</label>
          <input type="checkbox" className="form-control"  name="companyAccount"  onChange={(e)=>this.changeHandler(e)} />
        </div>
        {this.state.companyAccount?<Aux>
          <div className={`form-group ${styles.checkBox}`}>
        <label >Are you a company owner?
        </label>
          <input type="checkbox" className="form-control"  name="role"  onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className="form-group">
        <label >What is the name of your company?
        </label>
          <input type="text" className="form-control"  name="companyName" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        </Aux>:null}
        <div className="form-group">
          <label>Fill in your Email address</label>
          <input type="email" className="form-control"  aria-describedby="emailHelp" name="email" placeholder="Enter email" onChange={(e)=>this.changeHandler(e)} required/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label >Fill in your Password</label>
          <input type="password" className="form-control" name="password" placeholder="Password" required  onChange={(e)=>this.changeHandler(e)}/>
        </div>
        <div className="form-group form-check">
          
        </div>
        <button type="submit" className="btn btn-primary" >Sign In</button>
        <p>Or you can <span onClick={(e)=>this.buttonClickHandler(e)} className={styles.Link}>Log In</span> if you already have one</p>
      </form>
    }

    return(<Aux>
       {this.state.loading? <Plane/> : null}
        <div className={styles.Body}>
        <div className={styles.Content}>
        <div className={styles.Text}>
        <h1>Trip planner</h1>
        <p>Use this application to plan your travels and get them accepted by your boss.</p>
        </div>
        <div className={styles.Form}>
        {form}
        </div>
        </div>
            </div>
            </Aux>
    )
    }
}


export default Home