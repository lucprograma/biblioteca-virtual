import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
const ContentRenderer = ({children}) => 
 (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );

export default ContentRenderer;