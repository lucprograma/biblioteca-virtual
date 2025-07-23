import React, { useState } from "react";
import Navbar from "./components/navbar";
import Footer from "../components/footer";
const ContentRenderer = ({children}) => 
 { 
  const {isVisible, setIsVisible} = useState(true);
  return (
   <>
      <Navbar />
            
      {
        React.Children.map(
          children,(child) => child
        )
      }
      <Footer />
    </>
  );
}
export default ContentRenderer;