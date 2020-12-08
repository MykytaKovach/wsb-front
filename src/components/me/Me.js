import React ,{Component}from 'react'
import styles from './Me.module.css'
import axios from '../../axios'
import Plane from '../loading/Plane'
import Aux from '../../hoc/auxilary'

class Me extends Component {
    state={
        loading:false,
        editing:false,
        city:'',
        name:'',
        company:'',
        department:'',
        email:'',
        position:'',
        phone:'',
        profilePic:'https://image.shutterstock.com/display_pic_with_logo/1998197/439433326/stock-photo-casually-handsome-confident-young-handsome-man-in-jeans-shirt-keeping-arms-crossed-and-smiling-439433326.jpg'
    }

    componentDidMount(){
       
       const user=JSON.parse(localStorage.getItem('user')).data.data
       this.setState({
           name:user.name,
           city:user.city,
           company:user.company,
           department:user.department,
           email:user.email,
           position:user.position,
           phone:user.phone

       })
    }
    editHandler(e){
        e.preventDefault()
        if(this.state.editing){
            this.setState({loading:true})
            axios.put('https://kovach-beta-login.herokuapp.com/public/api/user',{
                id:""+JSON.parse(localStorage.getItem('user')).data.data.id,
                name:this.state.name,
                email:this.state.email,
                city:this.state.city,
                company:this.state.company,
                department:this.state.department,
                position:this.state.position,
                phone:this.state.phone,
                password:"test"
            }).then(res=>{
                this.setState({loading:false})
                localStorage.clear()
                localStorage.setItem('user',JSON.stringify(res))
                console.log(res)}).catch(er=>console.log(er))
        }
        this.setState({editing:!this.state.editing})
    }
    changeHandler(e){
        
        this.setState({[e.target.name]:e.target.value})
    }
    logOutHandler(){
        localStorage.clear()
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
                {this.state.editing?<form>
                <label >   Profile Image(paste an url):</label>
                        <input type="text" disabled={!this.state.editing} name='profilePic' value={this.state.profilePic} onChange={(e)=>this.changeHandler(e)}/>
                        </form>:null}
                <hr/>
                <div className={styles.Data}>
                    <form>
                    <label ><i className="far fa-envelope"></i>   Company:</label>
                        <input type="text" 
                        disabled={!this.state.editing} 
                        focus={""+!this.state.editing} 
                        value={this.state.company}
                        name="company"
                        onChange={(e)=>this.changeHandler(e)}
                        />
                    <label ><i className="fas fa-phone"></i>   Phone:</label>
                        <input type="text" disabled={!this.state.editing} name='phone' value={this.state.phone} onChange={(e)=>this.changeHandler(e)}/>
                    <label ><i className="fas fa-broadcast-tower"></i>   Town:</label>
                        <input type="text" disabled={!this.state.editing} name='city' value={this.state.city} onChange={(e)=>this.changeHandler(e)}/>
                    <label ><i className="far fa-building"></i>   Department:</label>
                        <input type="text" disabled={!this.state.editing} name='department' value={this.state.department} onChange={(e)=>this.changeHandler(e)}/>
                    <label ><i className="fas fa-user"></i>   Position:</label>
                        <input type="text" disabled={!this.state.editing} name='position' value={this.state.position} onChange={(e)=>this.changeHandler(e)}/>
                        <button type="submit" className={"btn btn-primary " +styles.Button} onClick={(e)=>this.editHandler(e)}>{this.state.editing?'Save':'Edit'}</button>
                        <button type="submit" className={"btn btn-primary " +styles.Buttond} onClick={()=>this.logOutHandler()}>Log Out</button>
                    </form>
                        
                </div>
            </div></div>
            </Aux>
        )
    }
}

export default Me