import React, { useState } from "react";
import Navbar from "../components/navbar";
;
import Footer from "../components/footer";
import SearchForm from "../components/searchForm";

const ContentRenderer = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Navbar>
        <SearchForm />
      </Navbar>

      {React.Children.map(children, (child) => child)}

      <Footer />
    </>
  );
};

export default ContentRenderer;