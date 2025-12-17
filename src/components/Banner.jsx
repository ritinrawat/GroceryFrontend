import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  const [bannerData, setBannerData] = useState("");

  const getBannerData = async () => {
    const response = await fetch("https://grocery-x2ds.onrender.com/homeproducts/getBanner");
    const data = await response.json();
    setBannerData(data);
  };
console.log("Banner Data:", bannerData);
  useEffect(() => {
    getBannerData();
  }, []);

 const bannerImage = [
  { img: bannerData.cardBannerImage1 },
  { img: bannerData.cardBannerImage2 },
  { img: bannerData.cardBannerImage3 },
 ]
  return (
    <section className="px-6 py-4">
      <img
        src={bannerData.mainBannerImage}
        alt="Main Banner"
        className="rounded-lg w-full h-auto object-cover mb-6"
      />
    
      <div className="block lg:hidden">
        <Swiper slidesPerView={1.2} spaceBetween={15}>
          {bannerImage.map((card, i) => (
            <SwiperSlide key={i}>
               <img className="rounded-xl w-full h-[20vh] object-cover"
                    src={card.img}
                    alt="Card"
                  />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {bannerImage.map((card, i) => (
              <img
              className="rounded-xl w-full h-[33vh] object- hover:scale-105 transition-transform duration-300"
                src={card.img}
                alt="Card"
              /> 
        ))}
      </div>  

    </section>
  );
};

export default Banner;
