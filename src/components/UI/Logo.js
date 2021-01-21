import logo from '../../assets/img/logo.png'

function Logo() {
    return(
   <div style={{display:'flex',flexFlow:'column',alignItems:'',fontFamily:'zilap',color:'#fff',fontSize:'0.7rem'}}>
    <img style={{margin:'auto'}} src={logo} alt="logo"  width="50" height="50"/>
    <p style={{marginBottom:'0'}}>Trip Planner</p>

    </div> 
    )
}

export default Logo
