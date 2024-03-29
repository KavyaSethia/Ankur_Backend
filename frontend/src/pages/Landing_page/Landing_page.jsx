import React from "react";

import Footer from "./Footer/Footer";
import Navigation from "../../components/Navigation";
import HomeBoot from "./Section2/HomeBoot";
import Section3 from "./Section3/Section3";
import Section4 from "./Section4/Section4";
import Section5 from "./Section5/Section5";

const Landing_page = () => {
  return (
    <>
      <Navigation />
      <HomeBoot />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </>
  );
};

export default Landing_page;