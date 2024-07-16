import React from "react";
import { Link ,useLocation} from "react-router-dom";
import Logo from "/Logo.png"

import n from './Navbar.module.css'

const Navbar = ({onLogout})=>{
    const location = useLocation();
    if(location.pathname == '/profile'){
      return(
        <div className="Navbar">
<nav  className={n.nav}>
    <ul className={n.nav}>
        
        <li><Link to="/"><img src={Logo} alt="" className={n.logo}/></Link></li>
        <li ><Link to="/" className={n.logoname}>MockMaster</Link></li>
        </ul>
        <div className={n.btns}>
          <li><Link to="/profile" className={n.current}>PROFILE</Link></li>
          <li><Link to='/about' className={n.normal_navigator}> ABOUT</Link></li>
        <li><Link to='/' className={n.normal_navigator}> HOME</Link></li>
          <li><button  onClick={onLogout} className={n.sign_log_btn}>LOGOUT</button></li>
          </div>
        </nav>
       </div>

      )
    }else{
    return(
 <div className="Navbar">
<nav  className={n.nav}>
    <ul className={n.nav}>
        
        <li><Link to="/"><img src={Logo} alt="" className={n.logo}/></Link></li>
        <li ><Link to="/" className={n.logoname}>MockMaster</Link></li>
        </ul>
       <div>

       {location.pathname == '/login' ? (
       
       <div className={n.btns}>
        
        {/* <li><Link to="/profile" className={n.normal_navigator}>PROFILE</Link></li> */}
        <li><Link to="/login" className={n.current}>LOGIN</Link></li>
        <li><Link to="/register" ><button className={n.sign_log_btn}>SIGNUP</button></Link></li>
        </div>
      ) : (
        location.pathname == '/register' ? (
          <div className={n.btns}>
          {/* <li><Link to="/profile" className={n.normal_navigator}>PROFILE</Link></li> */}
          <li><Link to="/register" className={n.current}>SIGNUP</Link></li>
          <li><Link to="/login" ><button className={n.sign_log_btn}>LOGIN</button></Link></li>
          </div>
          

        ):
        location.pathname == '/dashboard' ? (
          <div className={n.btns}>
          <li><Link to="/profile" className={n.normal_navigator}>PROFILE</Link></li>
          <li><Link to='/about' className={n.normal_navigator}> ABOUT</Link></li>
        <li><Link to='/' className={n.normal_navigator}> HOME</Link></li>
          <li><button  onClick={onLogout} className={n.sign_log_btn}>LOGOUT</button></li>
          </div>
          

        ):
        localStorage.getItem('auth-token') !=null ?(
<div className={n.btns}>
<li><Link to="/profile" className={n.normal_navigator}>PROFILE</Link></li>
        <li><Link to='/about' className={n.normal_navigator}> ABOUT</Link></li>
        <li><Link to='/dashboard' className={n.normal_navigator}> DASHBOARD</Link></li>
        <li><button  onClick={onLogout} className={n.sign_log_btn}>LOGOUT</button></li>
        </div>
        ):
        <div className={n.btns}>
          <li><Link to="/profile" className={n.normal_navigator}>PROFILE</Link></li>
        <li><Link to='/about' className={n.normal_navigator}> ABOUT</Link></li>
        <li><Link to='/dashboard' className={n.normal_navigator}> DASHBOARD</Link></li>
        <li><Link to="/login" ><button className={n.sign_log_btn}>LOGIN</button></Link></li>
        <li><Link to="/register" ><button className={n.sign_log_btn}>SIGNUP</button></Link></li>
        </div>
        
      )}
       </div>
   
</nav>

 </div>
    )
}
}
export default Navbar