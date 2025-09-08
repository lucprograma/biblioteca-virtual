import React from "react"

import Navbar from "../components/navbar"

import Footer from "../components/footer"

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PublicLayout

