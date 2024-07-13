import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar/Navbar";
import background from "/Background.png"


import A from'./About.module.css';

const AboutUs = () => {
  return (
    <>
     <Navbar />
    <div className={A.aboutcontainer}>
      <h1 className={A.aboutcontainerh1}>About Us</h1>
      <p className={A.aboutcontainerp}>
        Welcome to Mock-master, your ultimate partner in mastering the art of job interviews through tailored mock questions designed to enhance your confidence and competence.
      </p>

      <h2 className={A.aboutcontainerh2}>1. Company's Journey</h2>
      <p className={A.aboutcontainerp}>
        Founded in 2015, Mock-master began as a small startup with a singular vision: to empower students and job seekers to excel in their interview processes. Recognizing the gap between academic knowledge and real-world interview expectations, our founders, a group of career coaches and HR professionals, devised a platform that simulates the interview environment. Over the years, we've grown from a modest blog sharing interview tips to a comprehensive platform offering personalized mock interview experiences across various industries.
      </p>

      <h2 className={A.aboutcontainerh2}>2. Purpose and Goals</h2>
      <p className={A.aboutcontainerp}>
        Our primary purpose at Mock-master is to demystify the job interview process and equip candidates with the tools they need to succeed. We aim to bridge the gap between being a qualified candidate and presenting oneself as the best possible choice in an interview. Our goals include expanding our reach to include more industries and job levels, continuously updating our question bank with the latest trends in hiring, and enhancing our technology to provide a more immersive mock interview experience.
      </p>

      <h2 className={A.aboutcontainerh2}>3. Introduction to the Team</h2>
      <p className={A.aboutcontainerp}>
        At the heart of Mock-master is a diverse team of experts dedicated to your interview success. Our team comprises seasoned HR consultants, experienced career coaches, and technical experts who work collaboratively to ensure our content and simulations are current and effective. Each member brings a wealth of knowledge and a unique perspective on what makes an interview successful, ensuring that our users receive well-rounded preparation.
      </p>

      <h2 className={A.aboutcontainerh2}>4. Offerings</h2>
      <ul className={A.aboutcontainerul}>
        <li className={A.aboutcontainerli}><strong>Customizable Mock Interviews:</strong> Users can select interviews based on specific job roles and industries.</li>
        <li className={A.aboutcontainerli}><strong>Real-Time Feedback:</strong> Receive constructive feedback from industry experts to improve your responses and demeanor.</li>
        <li className={A.aboutcontainerli}><strong>Interview Tips and Resources:</strong> Access articles, videos, and guides to help prepare for interviews.</li>
        <li className={A.aboutcontainerli}><strong>AI-Driven Analytics:</strong> Utilize our AI tools to analyze your performance and identify areas for improvement.</li>
      </ul>

      <h2 className={A.aboutcontainerh2}>5. Customer Opinions</h2>
      <p className={A.aboutcontainerp}>We value the feedback of our users, and it's their success stories that keep us motivated. Here's what some of our users have to say:</p>
      <blockquote className={A.aboutcontainerblockquote}>
        <p className={A.aboutcontainerp}>"Mock-master was instrumental in helping me land my dream job. The personalized questions and feedback were spot on!" - Emily R.</p>
        <p className={A.aboutcontainerp}>"Thanks to Mock-master, I went into my interviews feeling prepared and confident. Highly recommend their platform!" - Rajesh K.</p>
      </blockquote>

      <h2 className={A.aboutcontainerh2}>6. Achievements</h2>
      <p className={A.aboutcontainerp}>Since our inception, Mock-master has achieved several milestones:</p>
      <ul className={A.aboutcontainerul}>
        <li className={A.aboutcontainerli}><strong>Over 100,000 Users:</strong> Our platform has helped over 100,000 individuals prepare for their job interviews.</li>
        <li className={A.aboutcontainerli}><strong>Top Rated:</strong> Rated as one of the top platforms for interview preparation by various career websites.</li>
        <li className={A.aboutcontainerli}><strong>Global Reach:</strong> Our user base spans across continents, assisting candidates from different cultural backgrounds.</li>
      </ul>

      <h2 className={A.aboutcontainerh2}>7. Call to Action</h2>
      <p className={A.aboutcontainerp}>
        Ready to ace your next job interview? Join thousands of successful job seekers by signing up for Mock-master today! Explore our services, utilize our resources, and start your journey to interview success. <a href="Register" className={A.aboutcontainera}>Sign up now</a> and transform your interview preparation with Mock-master.
      </p>
    </div>
    </>
  );
};

export default AboutUs;
