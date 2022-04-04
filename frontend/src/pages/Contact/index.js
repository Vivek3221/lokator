import React, {useState} from "react";
import { Formik, Field, Form } from "formik";
import {Modal,Input,FocusError,Select,Textarea} from '../../components'
import {contactvalidator} from '../../utils/validation'
import { addContact } from "../../store/actions/allapi";
import  ContactIcon  from "../../assests/images/customer.png";



import { connect } from "react-redux";

const Contact = ({addContact}) => {

  const [hasSubmitted,setHasSubmitted] = useState(false)
  const  handleContact = async (values)=>{
    await  addContact(values);
    setHasSubmitted(true)
    

  }

  
  return (
    <div>
      
        
      <div className="site-section contact-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mb-5">
              <h3>
Contact Us</h3>
<div className="card head">
Fill in your details and we will call you back
</div>
              <div className="card">
              <div className="card-body">
                {hasSubmitted ? (
                   <div className="text-center">
                   <h1 className="display-3">Thank You!</h1>
                   <p className="lead">We will get in touch with you very soon.</p>
                   <hr />

                 </div>
                ):(
                  <Formik
                enableReinitialize
                initialValues={{
                  name: "",
	email:"",
	business_name: "",
	phone:"",
	message:""
                  
                  }}
                validate={(values) => contactvalidator(values)}
                validateOnChange
                onSubmit={handleContact}
              >
                {(formikBag) => {
                  return (
                    <Form>
                  <div className="row">
                    <div className="col-lg-12">
                      <label>Name *</label>
                    <Field name="name">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        error={
                          formikBag.touched.name &&
                          formikBag.errors.name
                            ? formikBag.errors.name
                            : null
                        }
                        className="form-control"
                        placeholder={"Enter Your Name"}
                      />
                    )}
                  </Field>
                    </div>
                    
                    
                    
                  </div>
                  <div className="row">
                     <div className="col-lg-12">
                    <label>Email *</label>
                    <Field name="email">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        className="form-control"
                        error={
                          formikBag.touched.email &&
                          formikBag.errors.email
                            ? formikBag.errors.email
                            : null
                        }
                        placeholder={"Email Address"}
                      />
                    )}
                  </Field>
                    </div>
                    
                  </div>

                  <div className="row">
                     <div className="col-lg-12">
                    <label>Business Name </label>
                    <Field name="business_name">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="form-control"
                        error={
                          formikBag.touched.business_name &&
                          formikBag.errors.business_name
                            ? formikBag.errors.business_name
                            : null
                        }
                        placeholder="Business Name"
                      />
                    )}
                  </Field>
                    </div>
                    
                  </div>
                  
                  
                  
                  <div className="row">
                    <div className="col-lg-12">
                      <label>Phone</label>
                   
                    <Field name="phone">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        
                        className="form-control"
                        placeholder={"Phone Number"}
                        
                        error={
                          formikBag.touched.phone &&
                          formikBag.errors.phone
                            ? formikBag.errors.phone
                            : null
                        }
                      />
                    )}
                  </Field>
                  
                    </div>
                    
                  </div>
                  <div className="row">
                  <div className="col-lg-12">
                    <label>Your Message</label>
                    <Field name="message">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        type="text"
                        error={
                          formikBag.touched.message &&
                          formikBag.errors.message
                            ? formikBag.errors.message
                            : null
                        }
                        
                        className="form-control"
                        placeholder={"Your Message"}
                      />
                    )}
                  </Field>
                    </div>
                    
                  </div>
                  

                  
                  
                  <div className="py-3 text-center">
                    <button type="submit" className="btn-primary btn-block btn text-white">
                    Send
                    </button>
                  </div>
                 
                  <FocusError />
                </Form>
                  );
                }}
              </Formik>
                )}
            
              </div>
              </div>
            </div>

            <div className="col-md-5">
              <img src={ContactIcon}/>
              {/* <div className="p-4 mb-3 bg-white">
                <p className="mb-0 font-weight-bold">Address</p>
                <p className="mb-4">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
                <p className="mb-0 font-weight-bold">Phone</p>
                <p className="mb-4">
                  <a href="#">+1 232 3235 324</a>
                </p>
                <p className="mb-0 font-weight-bold">Email Address</p>
                <p className="mb-0">
                  <a href="#">youremail@domain.com</a>
                </p>
              </div> */}
              {/* <div className="p-4 mb-3 bg-white">
                <h3 className="h5 text-black mb-3">More Info</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                  ad iure porro mollitia architecto hic consequuntur. Distinctio
                  nisi perferendis dolore, ipsa consectetur? Fugiat quaerat eos
                  qui, libero neque sed nulla.
                </p>
                <p>
                  <a href="#" className="btn btn-primary px-4 py-2 text-white">
                    Learn More
                  </a>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div  className="map-wrapper"
      >
        <div className="container">
              <div className="row">
                <div className="col-lg-8">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31144.504072194395!2d-8.028514235384366!3d12.643871185700009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51cc8a9561831d%3A0xb13a535acb607d08!2sHamdallaye%20ACI%202000!5e0!3m2!1sen!2sin!4v1632585979480!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="col-lg-4">
                  <h3>Contact Us</h3>
                   
                <p className="mb-0 font-weight-bold">Address</p>
                <p className="mb-2">
                Immeuble Abdoulaye BAH, Bureau N°9 <br/>
Hamdallaye ACI 2000 Rue 331 , BPE 1846 Bamako Mali 
                </p>
                <p className="mb-0 font-weight-bold">Appel , SMS , WhatsApp, WeChat </p>
                <p className="mb-2">
                  <a href="tel:+223 20 23 26 05">+223 20 23 26 05 /</a>  <a href="tel:+223 66 75 48 11">+223 66 75 48 11 </a> 
                </p>
                <p className="mb-0 font-weight-bold">Email Address</p>
                <p className="mb-0">
                  <a href="#">info@Lokator.com</a>
                </p>
                              </div>
                </div>
              </div>
      </div>
    </div>
    
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  allapi:state.allapi
});

const mapActionsToProps = {
addContact
};

export default connect(mapStateToProps, mapActionsToProps)(Contact);
