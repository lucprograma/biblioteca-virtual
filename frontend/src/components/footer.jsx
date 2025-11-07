import React from "react";
import idoslogo from "../assets/idoslogo.jpeg";
import centrologo from "../assets/centrologo.jpeg";

const Footer = () => (

  <footer
    className="text-center text-lg-start text-white"
    style={{ backgroundColor: "#1c2331" }}
  >
    {/* Section: Social media */}
    <section
      className="d-flex justify-content-between p-4"
      style={{ backgroundColor: "#6351ce" }}
    >
      {/* Left */}
      <div className="me-5 justify-content-center align-items-center d-flex">
        <span>Mantenete conectado en las redes sociales</span>
      </div>
      {/* Right */}
      <div>
          <img src={idoslogo} alt=""
          className="me-4"
            style={
              {
                height: "64px",
                borderRadius: "50%",
                width: "64px"
              }
            }
          />
          <img src={centrologo} alt=""
          className="me-4"
            style={
              {
                height: "64px",
                borderRadius: "50%",
                width: "64px"
              }
            }
          />
      </div>
    </section>
    {/* Section: Links */}
    <section>
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Biblioteca ISFDyT N°2</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
                textAllign: "justify"
              }}
            />
            <p>
        Sistema desarrollado por y para estudiantes de todas las carreras del <b>Instituto Superior de Formacion Docente y Técnica N°2 de Azul</b>. Destinado compartir información y textos correspondiente a cada una de las carreras.
            </p>
          </div>
          {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Products</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
              }}
            />
            <p>
              <a href="#!" className="text-white">
                MDBootstrap
              </a>
            </p>
            <p>
              <a href="#!" className="text-white">
                MDWordPress
              </a>
            </p>
            <p>
              <a href="#!" className="text-white">
                BrandFlow
              </a>
            </p>
            <p>
              <a href="#!" className="text-white">
                Bootstrap Angular
              </a>
            </p>
          </div> */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">links utiles</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
              }}
            />
            <p>
              <a href="https://www.instagram.com/centrou.c.e?igsh=MWo1NDYxODV2aTBnYw==" className="text-white">
                Instagram
              </a>
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Contacto</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
              }}
            />
            <p>
              <i className="fas fa-home mr-3"></i> New York, NY 10012, US
            </p>

          </div>
        </div>
      </div>
    </section>
    {/* Copyright */}
    <div
      className="text-center p-3"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
     Centro de Estudiantes - ISFDyT N°2 Azul
    </div>
  </footer>
);


export default Footer;