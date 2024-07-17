import React,{useEffect} from "react";
import {Link ,useLocation, useNavigate } from 'react-router-dom';


import Navbar from "../components/Navbar/Navbar"
import Footer from '../components/Navbar/Footer';
import H from "./Home.module.css"

const Home = ()=>{
  
    const navigate = useNavigate();
const handleGet = ()=>{
  if(localStorage.getItem('auth-token') != null){
    console.log("dhs")
    navigate('/dashboard')
  }else{
    alert('YOU ARE NOT AUTHORIZED');
    navigate('/login')

  }
}
   
      const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
      };
    
    return(
 <>
<Navbar onLogout ={handleLogout} className="Navbar"/>
    <img className={H.bg1} src="/bg1.png" alt="" />
<div className={H.container}>
    {/* <img className={H.bg2} src="/bg2.png" alt="" />
    <img className={H.bg3} src="/bg3.png" alt="" /> */}
    <p className={H.hey}>Hey there ,</p>
    <p className={H.hey2}> Enhace your skills with</p>
    <p className={H.hey1}>AI driven MockIntervew</p>
<img className={H.st1} src="/Star-1.png" alt="" />
    <img className={H.st2} src="/Star-1.png" alt="" />
    <img className={H.st3} src="/Star-2.png" alt="" />
    <img className={H.st4} src="/Star-3.png" alt="" />
    <img className={H.st5} src="/Star-4.png" alt="" />
    <img className={H.st6} src="/Star-5.png" alt="" />
    
<img className={H.img1} src="/PurpleElipse.png" alt="" />
<img className={H.img2} src="/Blue Elipse.png" alt="" />
<img className={H.img3} src="/Yellow Elipse.png" alt="" />

<li><button className={H.btn} onClick={handleGet}>GET STARTED</button></li>
</div>
<Footer />
 </>
    )
}
export default Home;