
import React, { Component } from "react";
import Slider from "react-slick";
import client1 from '../assests/images/client1.png'
import client2 from '../assests/images/client2.png'
import client3 from '../assests/images/client3.png'
import client4 from '../assests/images/client4.png'
import client5 from '../assests/images/client5.png'

export default class LogoSlider extends Component {
  render() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        autoplay:true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    };
    return (
      <div>
        <div class="pb-1 border-primary mb-4 text-center"><h2 class="text-primary">Our Partners</h2></div>
        <Slider {...settings}>
          <div>
            <img src={client1}/>
          </div>
          <div>
          <img src={client2}/>
          </div>
          <div>
          <img src={client3}/>
          </div>
          <div>
          <img src={client4}/>
          </div>
          <div>
          <img src={client5}/>
          </div>
          
        </Slider>
      </div>
    );
  }
}
