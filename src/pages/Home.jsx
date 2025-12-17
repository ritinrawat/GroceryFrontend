import React from "react";
import Navbar from "../components/Navbar";

import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
;


// import ProductCard from "../components/ProductCard"


const Home = () => {

  
  return (
    <div>
      <Navbar />
      <Banner />
<CategoryList />     
<HeroSection/>
<Footer />
          
        
        
    </div>
  );
};

export default Home;
