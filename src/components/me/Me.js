import React ,{Component}from 'react'
import styles from './Me.module.css'
import axios from '../../axios'
import Plane from '../loading/Plane'
import Aux from '../../hoc/auxilary'

class Me extends Component {
    state={
        loading:false,
        editing:false,
        name:'',
        company:'',
        email:'',
        role:'',
        password:'',
        profilePic:'https://image.shutterstock.com/display_pic_with_logo/1998197/439433326/stock-photo-casually-handsome-confident-young-handsome-man-in-jeans-shirt-keeping-arms-crossed-and-smiling-439433326.jpg'
    }

    componentDidMount(){
        axios.get('https://wsb-backend.herokuapp.com/me',{headers:{
            'Authorization': 'Bearer ' +localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }}).then(res=> {
            this.setState({
                name: `${res.data.firstName}  ${res.data.lastName}`,
                company:res.data.companyName,
                role:res.data.role,
                email:res.data.email
        })})
        .catch(er=>console.log(er))
       
       


    }
    editHandler(e){
        e.preventDefault()
        if(this.state.editing && this.state.password){
            this.setState({loading:true})
            axios.patch('https://wsb-backend.herokuapp.com/me',{
                password:this.state.password
            },{headers:{
                'Authorization': 'Bearer ' +localStorage.getItem("token")
            }}).then(res=>{
                this.setState({loading:false})
                }).catch(er=>console.log(er))
        }
        this.setState({editing:!this.state.editing})
    }
    changeHandler(e){
        
        this.setState({[e.target.name]:e.target.value})
    }
   deleteHandler(e){
        e.preventDefault()
        axios.delete('https://wsb-backend.herokuapp.com/me',
        {headers:{
            'Authorization': 'Bearer ' +localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }})
        .then(res=>{
            localStorage.clear()
            window.location.reload()
        })
        .catch(er=>console.log(er))}

    logOutHandler(e){
            e.preventDefault()
            axios.post('https://wsb-backend.herokuapp.com/logout',{},
            {headers:{
                'Authorization': 'Bearer ' +localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }})
            .then(res=>{
                localStorage.clear()
                window.location.reload()
            })
            .catch(er=>console.log(er))
        
    }
    render(){
        return(
            <Aux>
            {this.state.loading? <Plane/> : null}
            <div className={styles.Me}>
            <div className={styles.Box}>
                <div>
                <div className={styles.Avatar} style={{background:`url(${this.state.profilePic})`}}></div>
                <div className={styles.Personal}>
                    <h4>{this.state.name}</h4>
                    <p><b>Email: </b>{this.state.email}</p>
                    
                </div></div>
               
                <hr/>
                <div className={styles.Data}>
                    <form>
                    <label ><i className="far fa-envelope"></i>   Company:</label>
                        <input type="text" 
                        focus={""+!this.state.editing} 
                        value={this.state.company}
                        name="company"
                        onChange={(e)=>this.changeHandler(e)}
                        />
                    <label ><i className="fas fa-user"></i>   Position:</label>
                        <input type="text"name='position' value={this.state.role} onChange={(e)=>this.changeHandler(e)}/>
                        {this.state.editing ?
                        <Aux>
                        <label ><i className="fas fa-key"></i>   Password:</label>
                        <input type="password"  name='password' value={this.state.password} onChange={(e)=>this.changeHandler(e)}/>
                        </Aux>:null}
                        
                        <button type="submit" className={"btn btn-primary " +styles.Button} onClick={(e)=>this.editHandler(e)}>{this.state.editing?'Update password':'Edit'}</button>
                        {this.state.editing?<button type="submit" className={"btn btn-primary " +styles.Buttond} onClick={(e)=>this.deleteHandler(e)}>Delete profile</button>:
                        <button type="submit" className={"btn btn-primary " +styles.Buttond} onClick={(e)=>this.logOutHandler(e)}>Log Out</button>
                        }
                        
                        
                    </form>
                        
                </div>
            </div></div>
            </Aux>
        )
    }
}

export default Me