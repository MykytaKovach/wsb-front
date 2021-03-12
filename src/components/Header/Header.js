import React ,{Component}from 'react'
import Aux from '../../hoc/auxilary'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'
import Logo from '../UI/Logo'

class Header extends Component {
    state={
        name:'about',
        burger:false,
        

    }
    toggleSideMenuHandler(){
        this.setState({burger:!this.state.burger})
        console.log('asdsad')
        
    }
    render(){
        let menu = <ul className={styles.NavbarNav}>
        <li className={styles.Current}>
            <NavLink to ="/"
            exact 
            activeClassName={styles.Active}
            >Home</NavLink></li>
            <li>
            <NavLink to ="/covid"
            activeClassName={styles.Active}
            >COVID</NavLink></li>
        <li>
            <NavLink to ="/about" 
                    activeClassName={styles.Active}
                    >about</NavLink>
            </li>
        <li>
            <NavLink to ="/me" 
                    activeClassName={styles.Active}
                    >me</NavLink>
            </li>
      </ul>

          let sideMenu=<div  className={styles.SideNav} style={{width:this.state.burger?'100%':'0px'}}>
          <NavLink to ="/" onClick={()=>this.toggleSideMenuHandler()} 
          activeClassName={styles.Active} exact>Home</NavLink>
          <NavLink to ="/covid" onClick={()=>this.toggleSideMenuHandler()}
           activeClassName={styles.Active}>covid</NavLink>
          <NavLink to ="/about" onClick={()=>this.toggleSideMenuHandler()}
           activeClassName={styles.Active}>About</NavLink>
          <NavLink to ="/me" onClick={()=>this.toggleSideMenuHandler()} 
          activeClassName={styles.Active}>Me</NavLink>
          
        </div>

        
        return(
          <Aux>
    <div className={styles.Header}>
      <div className={styles.Heading}>
        <Logo/>
        <nav>
          {menu}
          <span className={styles.OpenSlide}>
      <p onClick={()=>this.toggleSideMenuHandler()}>
      <i className="fas fa-bars"></i>
      </p>
    </span>
          
           
  </nav>
  </div>
  </div>
    
  {sideMenu}

    
  </Aux>
        )
    }
}

export default Header