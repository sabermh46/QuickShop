import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swip.css';
import {Navigation, FreeMode, Thumbs} from 'swiper/modules'
import { API } from "../../../constants/api";

const SwiperGallery = ({images})=> {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [slides, setSlides] = useState(null)

    function wow(){
        let swiperSlides
        if (Array.isArray(images)) {
            swiperSlides = images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={API + img} alt={img} />
              </SwiperSlide>
            ));
          }
          setSlides(swiperSlides)
    }

    useEffect(() => {
        
        images && wow()
      
    }, [])
    
    return (
        <div className="swiperContainer">
            <Swiper
                style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    slides
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    slides
                }
            </Swiper>
        </div>
    )
}

export default SwiperGallery