import React, { Component } from "react";
import BannerBg from "../../assests/images/hero_bg.jpg";
import BannerBg2 from "../../assests/images/hero_bg_2.jpg";

const Services = () => {
  return (
    <div>
      <div
        className="site-blocks-cover inner-page-cover overlay aos-init aos-animate"
        style={{
          backgroundImage:
            'url("images/xhero_bg_1.jpg.pagespeed.ic.tLtLHKGWU8.webp")',
          backgroundPosition: "50% 1324.5px",
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
                Services
              </h1>
              <p className="breadcrumb-custom">
                <a href="index.html">Home</a> <span className="mx-2">&gt;</span>{" "}
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
                src={BannerBg}
                alt="Image"
                className="img-fluid rounded"
                data-pagespeed-url-hash={3249581224}
                onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
              />
            </div>
            <div
              className="col-md-6 order-md-1 aos-init aos-animate"
              data-aos="fade"
            >
              <div className="text-left pb-1 border-primary mb-4">
                <h2 className="text-primary">Our History</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis deleniti reprehenderit animi est eaque corporis!
                Nisi, asperiores nam amet doloribus, soluta ut reiciendis.
                Consequatur modi rem, vero eos ipsam voluptas.
              </p>
              <p className="mb-5">
                Error minus sint nobis dolor laborum architecto, quaerat.
                Voluptatum porro expedita labore esse velit veniam laborum quo
                obcaecati similique iusto delectus quasi!
              </p>
              <div className="row">
                <div className="col-md-12 mb-md-5 mb-0 col-lg-6">
                  <div className="unit-4">
                    <div className="unit-4-icon mb-3 mr-4">
                      <span className="text-primary flaticon-frontal-truck" />
                    </div>
                    <div>
                      <h3>Ground Shipping</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perferendis quis.
                      </p>
                      <p className="mb-0">
                        <a href="#">Learn More</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-md-5 mb-0 col-lg-6">
                  <div className="unit-4">
                    <div className="unit-4-icon mb-3 mr-4">
                      <span className="text-primary flaticon-travel" />
                    </div>
                    <div>
                      <h3>Air Freight</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perferendis quis.
                      </p>
                      <p className="mb-0">
                        <a href="#">Learn More</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="site-section "
        
      >
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center border-primary">
              <h2
                className="font-weight-light text-primary aos-init aos-animate"
                data-aos="fade"
              >
                How It Works
              </h2>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-6 col-lg-4 mb-5 mb-lg-0 aos-init aos-animate"
              data-aos="fade"
              data-aos-delay={100}
            >
              <div className="how-it-work-item">
                <span className="number">1</span>
                <div className="how-it-work-body">
                  <h2>Choose Your Service</h2>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt praesentium dicta consectetur fuga neque fugit a
                    at. Cum quod vero assumenda iusto.
                  </p>
                  <ul className="ul-check list-unstyled">
                    <li >Error minus sint nobis dolor</li>
                    <li >
                      Voluptatum porro expedita labore esse
                    </li>
                    <li >
                      Voluptas unde sit pariatur earum
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-5 mb-lg-0 aos-init aos-animate"
              data-aos="fade"
              data-aos-delay={200}
            >
              <div className="how-it-work-item">
                <span className="number">2</span>
                <div className="how-it-work-body">
                  <h2>Select Your Payment</h2>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt praesentium dicta consectetur fuga neque fugit a
                    at. Cum quod vero assumenda iusto.
                  </p>
                  <ul className="ul-check list-unstyled">
                    <li >Error minus sint nobis dolor</li>
                    <li >
                      Voluptatum porro expedita labore esse
                    </li>
                    <li >
                      Voluptas unde sit pariatur earum
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-5 mb-lg-0 aos-init aos-animate"
              data-aos="fade"
              data-aos-delay={300}
            >
              <div className="how-it-work-item">
                <span className="number">3</span>
                <div className="how-it-work-body">
                  <h2>Tracking Your Order</h2>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt praesentium dicta consectetur fuga neque fugit a
                    at. Cum quod vero assumenda iusto.
                  </p>
                  <ul className="ul-check list-unstyled">
                    <li >Error minus sint nobis dolor</li>
                    <li >
                      Voluptatum porro expedita labore esse
                    </li>
                    <li >
                      Voluptas unde sit pariatur earum
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Services;
