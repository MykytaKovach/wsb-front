import React , {Component} from 'react'
import styles from './LoginPage.module.css'
import Aux from '../../hoc/auxilary'
import Plane from '../loading/Plane'
import axios from './../../axios'
import Error from '../../hoc/error/error'
import Logo from '../UI/Logo'
import Carousel from './Carousel/Carousel'


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
      return this.errorHandler(er.response.data.errmsg|| er.response.data.message)
    })


}
errorHandler(msg){
  this.setState({error: msg,loading:false})
  setTimeout(()=>{
      this.setState({error:undefined})
  },5000)
}
render(){
    let form=<Carousel/>
    
    //LOGIN

    if(this.state.whatToShow==='Log In'){
        form = <form className={styles.Forms} onSubmit={(e)=>this.loginHandler(e)}>
            <h5>LOG IN an existing account</h5>
            {<Error msg = {this.state.error} />}
        <div className={styles.FormGroup}>
          <label>Email address</label>
          <input type="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange={(e)=>this.changeHandler(e)}/>
          <small id="emailHelp" >We'll never share your email with anyone else.</small>
          </div>
          <div className={styles.FormGroup}>
          <label >Password</label>
          <input type="password" name="password"   placeholder="Password" required onChange={(e)=>this.changeHandler(e)} />
          
        </div>

        <button type="submit"  >Log In</button>
        <p>Or you can <span onClick={(e)=>this.buttonClickHandler(e)} className={styles.Link}>Sign In</span> a new account</p>
      </form>
    } else if (this.state.whatToShow==='Sign In'){
      //SIGNIN

        form = <form className={styles.Forms} onSubmit={(e)=>this.registerHandler(e)}>
            <h5>Create new Account</h5>
            {<Error msg = {this.state.error} />}
            <div className={styles.FormGroup}>
            <label >Fill in your first name</label>
          <input type="text"   name="firstName"placeholder="John Doh" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className={styles.FormGroup}>
        <label >Fill in your last name</label>
          <input type="text"   name="lastName"placeholder="John Doh" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className={` ${styles.checkBox}`}>
        <label >Are you working for a company?</label>
          <input type="checkbox"   name="companyAccount"  onChange={(e)=>this.changeHandler(e)} />
        </div>
        {this.state.companyAccount?<Aux>
          <div className={`${styles.checkBox}`}>
        <label >Are you a company owner?
        </label>
          <input type="checkbox"  name="role"  onChange={(e)=>this.changeHandler(e)} />
        </div>
        <div className={styles.FormGroup}>
        <label >What is the name of your company?
        </label>
          <input type="text"   name="companyName" required onChange={(e)=>this.changeHandler(e)} />
        </div>
        </Aux>:null}
        <div className={styles.FormGroup}>
          <label>Fill in your Email address</label>
          <input type="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" onChange={(e)=>this.changeHandler(e)} required/>
          <small id="emailHelp" >We'll never share your email with anyone else.</small>
        </div>
        <div className={styles.FormGroup}>
          <label >Fill in your Password</label>
          <input type="password"  name="password" placeholder="Password" required  onChange={(e)=>this.changeHandler(e)}/>
          <small id="emailHelp" >Password has to be at least 8 symbol in lenght and contain capital letter, lowercase letter and a number</small>
        </div>
        <div className=" form-check">
          
        </div>
        <button type="submit"  >Sign In</button>
        <p>Or you can <span onClick={(e)=>this.buttonClickHandler(e)} className={styles.Link}>Log In</span> if you already have an account</p>
      </form>
    }

    return(<Aux>
       {this.state.loading? <Plane/> : null}
        <div className={styles.Body}>
        <div className ={styles.Header}>
          <Logo/>
        <div className={styles.HeaderBtn}>
        <button  onClick={(e)=>this.buttonClickHandler(e)}>Log In</button>
        <p>OR</p>
        <button  onClick={(e)=>this.buttonClickHandler(e)}>Sign In</button>
        </div>
        </div>
        <div className={styles.Content}>
        
        <div className={styles.Text}>
        <h1>PLAN YOUR TRIP</h1>
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