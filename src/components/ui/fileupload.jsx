import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import useAxios from "../../hooks/useAxios";;
export default function FileUpload({onFileselect}) {
  
  const fileInputRef = useRef(null);

  const {post,loading,error}=useAxios();



async function UploadFile(){

const CLOUDINARY_CLOUD_NAME='dth1xgjqm'
const CLOUDINARY_API_KEY='582439778292966'
const CLOUDINARY_API_SECRET='5bwcQ4XoJlVMhkpBF5QLnt755Vs'

    const url=`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/:resource_type/upload`

    const result=post()
}


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
     const type=selectedFile.type;
     console.log('selected file');
     console.log(selectedFile,type);

    if (selectedFile) {
        onFileselect({fileContent:event.target.files[0],type:event.target.files[0].type});
        
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      onFileselect({file:droppedFile,type:droppedFile.type});
    }
  };

  return (
   <div>
    {loading && (<div>Uploading File Please wait</div>)}
     <div
          className="w-full flex flex-col items-center  w-96 bg-white"
          onDragOver={handleDragOver}
          onDrop={handleDrop} /><div className="cursor-pointer">
              <input
                  name="file"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange} 
                  
                  />
              <input type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="flex items-center gap-2 p-2 justify-center bg-transparent cursor-pointer w-full"
                  disabled={!loading}
              />
                 
          </div>
   </div>
      
     
  );
}
