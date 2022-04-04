import React, { Component } from "react";
import BannerBg from "../../assests/images/jcb.jpeg";
import BannerBg2 from "../../assests/images/truck_image.png";
import { Link } from "react-router-dom";
import { LogoSlider } from "../../components";

const About = () => {
  return (
    <div>
      <div
        className="site-blocks-cover inner-page-cover overlay aos-init aos-animate"
        style={{
          backgroundImage:
            'url('+BannerBg+')',
          
        }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div
              className="col-md-8 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <h1 className="text-white font-weight-light text-uppercase font-weight-bold">
                About Us
              </h1>
              <p className="breadcrumb-custom">
                <Link to="/">Home</Link> <span className="mx-2">&gt;</span>{" "}
                <span>About Us</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div
              className="col-md-5 ml-auto mb-5 order-md-2 aos-init aos-animate"
              data-aos="fade"
            >
              <img
                src={BannerBg2}
                alt="Image"
                className="img-fluid rounded"
                
                onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
              />
            </div>
            <div
              className="col-md-6 order-md-1 aos-init aos-animate"
              data-aos="fade"
            >
              <div className="text-left pb-1 border-primary mb-4">
                <h2 className="text-primary">LOKATOR SAS</h2>
              </div>
              <p><strong>Lokator</strong> is a Malian company specializing in the rental and sale of machinery for earthworks and 4X4 off-road, industrial and public works materials in Africa. The range of Lokator also extends to supporting equipment for mining works.</p>
<p>Our rental services and sales concern the following materials:</p>
<p>Machinery: Dozers, Graders, Hydraulic excavators, Compactors, Articulated trucks, Tippers, Tanks, Generators, Pump sets, Container 20 feet and 40 feet etc.</p>
<p>Vehicles: Toyota, Land Cruiser, Toyota V8, Toyota Prado, 4x4 Pick up, Land Cruiser Pick up.</p>
<p>All machines offered are inspected, verified and guaranteed.</p>
              
            </div>
          </div>
        </div>
      </div>
      <div
        className="site-section "
        
      >
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-12 ">
              <h2
                className="text-primary aos-init aos-animate"
                data-aos="fade"
              >
                Advantage of our activity
              </h2>
              <p>Machine in good working condition.</p>
<p>Guarantee of interventions.</p>
<p>Machine safety.</p>
<p>Priority of troubleshooting on phone call.</p>
<p>Professional Conduct</p>
<p>The LSR (Local Service Representative) and all project personnel will ensure the highest levels of competence, conduct, cleanliness and integrity of the employees. Tasks will be performed according to workplace safety rules and practices. Each visit will be recorded on an intervention sheet targeted by the client and the provider with precision.</p>
<p>These cards will include the following information: date and names of the technicians, reason for the visit with details of the work carried out and any comments made.</p>
            </div>
          </div>
          <LogoSlider/>  
        </div>
        
      </div>
      
      
    </div>
  );
};

export default About;
