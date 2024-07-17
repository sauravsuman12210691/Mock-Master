import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from "react-router-dom";
import F from './Footer.module.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className={F.footer}>
      <div className={F.footercontainer}>
        <div className={F.footerlinks}>
          <Link to="/" className={F.footerlinksa}>Home</Link>
          <Link to="/about" className={F.footerlinksa}>About Us</Link>
          <Link to="/services" className={F.footerlinksa}>Services</Link>
          <Link to="/contact" className={F.footerlinksa}>Contact</Link>
        </div>
        <div className={F.footersocial}>
          <a href="https://www.linkedin.com/in/sakshi-sharma-a6a122271/" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaFacebook /></a>
          <a href="https://www.linkedin.com/in/sakshi-sharma-a6a122271/" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaTwitter /></a>
          <a href="https://www.linkedin.com/in/sakshi-sharma-a6a122271/" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/sakshi-sharma-a6a122271/" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaLinkedin /></a>
        </div>
        <div className={F.footerinfo}>
          <p className={F.footerinfop}>&copy; 2024 MockMaster. All rights reserved.</p>
          <p className={F.footerinfop}>Contact us: <a href="mailto:info@mockmaster.com" className={F.footersocialahover}>info@mockmaster.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
