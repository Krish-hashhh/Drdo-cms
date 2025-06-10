import React from "react";
import image from '../Assets/image.jpg';
import image1 from '../Assets/image1.jpg';
import './Home.css';


function Home(){
    return(
        <div className="home" id="hero" >
            <div className="logos">
            <img src={image} alt="" width="250" height="250" style={{marginRight:'80px'}}></img>
            <img src={image1} alt="" width="250" height="250"></img>
            </div>
            <h1>Complaint Management System | BITS Pilani</h1>
            <p>The Complaint Management System of BITS Pilani is a streamlined digital platform designed to empower students, faculty, and staff to voice their concerns effectively and ensure swift resolution. Whether it's campus infrastructure, academic issues, or administrative challenges, this system provides a transparent and organized approach to registering and tracking complaints. Our goal is to foster a more responsive and accountable campus environment by bridging the gap between stakeholders and resolution authorities. With real-time updates, user-friendly interfaces, and a commitment to continuous improvement, the system embodies BITS Pilani’s dedication to operational excellence and community well-being.</p>
            <div>
               <button className="btn" style={{ marginRight: '40px', textDecoration: 'none' }}><a href="https://www.drdo.gov.in/drdo/labs-establishment/contact-us/solid-state-physics-laboratory-sspl" target="_blank" rel="noopener noreferrer" className="btn" style={{textDecoration:'none'}}>Explore SSPL</a></button>
               <button className="btn" ><a href="https://www.bits-pilani.ac.in/" target="_blank" rel="noopener noreferrer" className="btn" style={{textDecoration:'none'}}>Explore BITS</a></button>
            </div>
        </div>

    );
}

export default Home;