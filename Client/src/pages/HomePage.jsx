import React from "react";
import Hero from "../component/Hero.jsx";
import Steps from "../component/Steps.jsx";
import Contact from "../component/Contacts.jsx";
import Footer from "../component/Footer.jsx";
import RoomGallery from "../component/RoomGallery.jsx";
import Navbar from "../component/Navbar.jsx";


const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Steps />
      <RoomGallery/>
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
