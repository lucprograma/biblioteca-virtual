import React from "react";
import { useRef, useEffect, useState } from "react";
const DocumentsBar = ({ folderState }) => {
  const baseUlref = useRef(null);
  const [folders, setFolders] = useState([]);
  const getFolderStructure = async () => {
    try{
      const folders = await fetch(`${import.meta.env.VITE_API_URL}folders/`);
      const data = await folders.json();
      console.table("data collected", data)
      return data;
      }  
    catch(error){
        console.error("Error fetching folder structure:", error);
      };
  };
   useEffect(() => {
    getFolderStructure().then(setFolders);
  }, []);
  const renderBar = (folderList) => {
      if(!folderList || typeof folderList[0].folder_id === 'undefined'){
        return (
          <p className="text-white">Folders not found</p>
        )
      }
      console.log(folderList)
      return(
        folderList.map(folder => (
          <li key={folder.folder_id}>
            <span
              data-bs-toggle="collapse"
              href={`#folder${folder.folder_id}`}
              role="button"
              aria-expanded="false"
              aria-controls={`folder${folder.folder_id}`}
              style={{ cursor: "pointer" }}

              onClick={() => {
                if(folder.type === "Year"){
                folderState(folder.folder_id)}
              }}
            >
              📁{folder.type === "Course"? folder.name : folder.year_level}
            </span>
            <ul className="collapse list-unstyled ps-3" id={`folder${folder.folder_id}`}>
        <>
          {folder.children?.length > 0 && renderBar(folder.children)}
          {folder.documents?.length > 0 && addDocs(folder.documents)}
        </>
</ul>
          </li>
        ))
      )
  }
  const addDocs = (docList) => {

  return docList.map(document => (
    <li key={document.id || document.title}>
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          if (addCard) addCard("./hola.txt");
        }}
      >
        📄 {document.title}
      </a>
    </li>
  ));
};

  return (
  <div
    className="offcanvas offcanvas-start bg-dark text-white"
    tabIndex={-1}
    id="sidebarMenu"
    aria-labelledby="sidebarMenuLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="sidebarMenuLabel">
        Estructura de Carpetas
      </h5>
      <button
        type="button"
        className="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div className="offcanvas-body" >
      <ul className="list-unstyled" ref={baseUlref}>
      
           {folders && folders.length > 0 ? renderBar(folders) : <p className="text-white">Folders not found</p>}
        
      </ul>
    </div>
  </div>
);
}

export default DocumentsBar;