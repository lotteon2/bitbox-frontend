import React from "react";
import Banner01 from "../../assets/images/main/banner01.png";
import Banner02 from "../../assets/images/main/banner02.png";
import Banner03 from "../../assets/images/main/banner03.png";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Banner() {
    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 5000,
        arrows: false
    }
    return <div className="w-full">
        <Slider {...settings}>
            <div>
                <img src={Banner01} alt="Banner01" />
            </div>
            <div>
                <img src={Banner02} alt="Banner02" />
            </div>
            <div>
                <img src={Banner03} alt="Banner03" />
            </div>
        </Slider>
    </div>
}