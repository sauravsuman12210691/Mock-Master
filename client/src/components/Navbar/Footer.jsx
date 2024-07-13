// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link ,useLocation} from "react-router-dom";
import F from './Footer.module.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className={F.footer}>
      <div className={F.footercontainer}>
        <div className={F.footerlinks}>
          <a href="/" className={F.footerlinksa}>Home</a>
          <a href="about" className={F.footerlinksa}>About Us</a>
          <a href="/services" className={F.footerlinksa}>Services</a>
          <a href="contact" className={F.footerlinksa}>Contact</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={F.footerlinksahover}><FaLinkedin /></a>
        </div>
        <div className={F.footerinfo}>
          <p className={F.footerinfop} >&copy; 2024 MockMaster. All rights reserved.</p>
          <p className={F.footerinfop}>Contact us: <a href="mailto:info@mockmaster.com" className={F.footersocialahover}>info@mockmaster.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
