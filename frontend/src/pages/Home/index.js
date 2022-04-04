import React, { useState,useEffect } from "react";
import BannerBg from "../../assests/images/hero_bg.jpg";
import { connect } from "react-redux";
import { getCategory } from "../../store/actions/allapi";
import {get} from 'lodash';
import { Link } from "react-router-dom";









import {Modal,Input,FocusError} from '../../components/.'
import { Formik, Field, Form } from "formik";
const Home = ({getCategory,allapi:{category,selectedImage},location:{search},history}) => {
  const [searchVal,setSearchValue]  = useState("")
  useEffect(()=>{
    getCategory(0,'',1)
  },[])
  const [showLogins,setLogins] = useState(false)
  const [showSignup,setShowSignup] = useState(false)
  return (
    <div>
      <div
        className="site-blocks-cover overlay"
        style={{ backgroundImage: `url(${BannerBg})` }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12" data-aos="fade-up" data-aos-delay={400}>
              <h3 className="text-white font-weight-light mb-5 text-uppercase font-weight-bold">
              Search for the equipment you want to rent and<br/> book it in a few clicks
              </h3>
              <div  className="home-search bg-dark">
                <h3 className="heading">Rent Equipment</h3>
              <div  className="search_form ">

              <div  className="form-group">
                <input className="form-control" type="text" onChange={(e)=> setSearchValue(e.target.value)} placeholder="Search for machine, brand, model"/>
                <button className="btn btn-primary text-white" type="submit" onClick={()=> history.push('/products?query='+searchVal)}>Search</button>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      

      <div className="site-section bg-light ">
        <div className="container">
          <div className="row justify-content-center mb-5 ">
            <div className="col-md-7 text-center border-primary">
              <h2 className="font-weight-light text-primary">Rent Machines</h2>
             
             
            </div>
          </div>
          <div className="row align-items-stretch">
          {get(category,'categoryList',[]).map(item=>{
              return(<div className="col-md-6 col-lg-3 mb-3 mb-lg-3">
                <Link to={"/products?query="+item.category_name}>
              <div className="unit-4 d-flex feature-item" key={item.id}>
                  <div>
                    <h3>{item.category_name}</h3>
                    <img src={item.category_image}/>
                    
                  </div>
                </div>
                </Link>
              </div>)
          })}
        
            
            </div>
          
        </div>
      </div>
      
      

      
      {/* Login Modal buttons */}
      <Modal show={showLogins}
       onClose={()=> setLogins(false)} content={<div className="btn_wrapper">

          <a href="/login?role_id=1" target="_blank" className="btn btn-success btn-block   text-white">
                  Sign in as Customer
                </a>
                <a href="/login?role_id=2" target="_blank" className="btn btn-success btn-block   text-white">
                  Sign in as Partner
                </a>
                
                </div>} />


                <Modal show={showSignup}
       onClose={()=> setShowSignup(false)} content={<div className="btn_wrapper">

          <a href="/register?role_id=1" target="_blank" className="btn btn-success btn-block   text-white">
                  Register in as Customer
                </a>
                <a href="/register?role_id=2" target="_blank" className="btn btn-success btn-block   text-white">
                Register in as Partner
                </a>
                
                </div>} />    

              
                
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi:state.allapi
});

const mapActionsToProps = {
  getCategory,
  
  
};

export default connect(mapStateToProps, mapActionsToProps)(Home);