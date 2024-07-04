import React from "react";
import { Link ,useLocation} from "react-router-dom";
import Logo from "/Logo.png"

import n from './Navbar.module.css'
import Dashboard from "../../Dashboard";
const Navbar = ()=>{
    const location = useLocation();
    return(
 <div>
<nav  className={n.nav}>
    <ul className={n.nav}>
        
        <li><Link to="/"><img src={Logo} alt="" className={n.logo}/></Link></li>
        <li ><Link to="/" className={n.logoname}>MockMaster</Link></li>
        </ul>
       <div>

       {location.pathname == '/login' ? (
       
       <div className={n.btns}>
        <li><Link to="/login" className={n.current}>LOGIN</Link></li>
        <li><Link to="/register" ><button className={n.sign_log_btn}>SIGNUP</button></Link></li>
        </div>
      ) : (
        <div className={n.btns}>
        <li><Link to="/register" className={n.current}>SIGNUP</Link></li>
        <li><Link to="/login" ><button className={n.sign_log_btn}>LOGIN</button></Link></li>
        </div>
        
      )}
       </div>
   
</nav>

 </div>
    )
}
export default Navbar