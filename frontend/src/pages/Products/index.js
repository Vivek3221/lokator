import React, { Component,useState,useEffect,useRef } from "react";
import BannerBg from "../../assests/images/hero_bg.jpg";
import { connect } from "react-redux";
import { getCategory,getMachines } from "../../store/actions/allapi";
import {get} from 'lodash';
import { Link } from "react-router-dom";
import {NoData} from '../../components/.'








const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
const Home = ({getCategory,getMachines,location:{search},allapi:{category,machines}}) => {

  const  query = new URLSearchParams(search);
  const [searchVal,setSearch] = useState(query.get('query')); 
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  useEffect(()=>{
    getCategory(0,'',1)
    
  
  },[])
  useEffect(()=>{
    
    setSearch(query.get('query'))
    
    
  },[search])
  useEffect(()=>{
    
    getMachines(0,searchVal,1,executeScroll)
    executeScroll()
    
  },[searchVal])
  const [showLogins,setLogins] = useState(false)
  const [showSignup,setShowSignup] = useState(false)
  return (
    <div>
      
        
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12" data-aos="fade-up" data-aos-delay={400}>
              <h3 className=" font-weight-light  header text-uppercase font-weight-bold">
              Get Quote
              </h3>
              <div  className="home-search bg-dark product">
                
              <div  className="search_form ">

              <div  className="form-group">
                <input className="form-control" value={searchVal} onChange={(e)=> setSearch(e.target.value) }type="text" placeholder="Search for machine, brand, model"/>
                <button className="btn btn-primary text-white" type="submit">Search</button>
                </div>
                </div>

              </div>
            </div>
          </div>
        
      
      
      

      <div className="site-section ">
        
          <div className="row justify-content-center mb-5 ">
            <div className="col-md-7 text-center border-primary">
              <h4 className="font-weight-bold text-primary">Rent Machines</h4>
             
             
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
          <div ref={myRef}></div>
            
            </div>
          
        
      </div>
      
      <div className="product-listing">
        {get(machines, "productsData", []).length == 0 && <NoData/>}
        {get(machines, "productsData", []).map(item=>{
          return(
            <div className="product-item">
          <div className="pd-left">
            <img src={item.machine_image}/>
          </div>
          <div className="pd-right">
            <h3>{item.machine_name}</h3>
            <p><strong>Category:</strong> {get(item, "machine_categories.name", "N/A")}</p>
            <p><strong>Type:</strong> {get(item, "machine_types.type", "N/A")}</p>
            <p><strong>Capacity:</strong> {get(item, "machine_capacities.type", "N/A")}</p>
            <button className="btn btn-primary text-white"><i className="fa fa-plus"></i> Add Enquiry</button>

          </div>

        </div>
          )
        })}
        
      </div>
      
      

      
      
              
                
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi:state.allapi
});

const mapActionsToProps = {
  getCategory,
  getMachines,
  
};

export default connect(mapStateToProps, mapActionsToProps)(Home);