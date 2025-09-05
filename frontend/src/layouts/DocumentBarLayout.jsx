import React from "react";
import DisplayButton from "../components/displayButton";
import DocumentsBar from "../components/documentsBar";
import { useState } from "react";
import { useEffect } from "react";
import { useGetUser } from "../hooks/getUser";
const DocumentBarLayout = ({ folderState }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
        try {
          const {data} = await useGetUser();
          if(!data) throw new Error("Cannot get user");
          setUser(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
          });
        } catch (err) {
          console.log(err);
        }
      };
  useEffect(()=>{
    fetchUser();
  }, [])
  return(
  <div>
     
    <div className="d-flex align-items-center gap-2 mb-3">
      <DisplayButton
        text="☰"
        className="btn btn-secondary position-relative"
        style={{
          zIndex: 1045,
          marginTop: "1rem",
          marginLeft: "1rem",
          display: "block",
        }}
        id="navigationButton"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      />
      {user?.role === "admin" &&
      <DisplayButton
        icon=""
        text="Añadir documento"
        className="btn btn-primary"
        type="button"
        id="addDocumentButton"
        data-bs-toggle="modal"
        data-bs-target="#uploadDocumentModal"
        style={{ zIndex: 1045,
          marginTop: "1rem",
          marginLeft: "1rem",
          display: "block", }}
      />}
    </div>
    <DocumentsBar folderState={folderState} />
  </div>
);}

export default DocumentBarLayout;