import React from 'react';
import {useDropzone} from 'react-dropzone';

function Upload({labelText ,onFileSelect}) {
  

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.gif']
    },
    onDrop: (files) => {
      
      onFileSelect(files[0]);
    }
  });

  return (
    <div className="flex justify-center items-center p-2 ">
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        {isDragAccept && (<p>All files will be accepted</p>)}
          {isDragReject && (<p>Some files will be rejected</p>)}
          {!isDragActive && (<p>{labelText}</p>)}
      </div>
    </div>
  );
}



export default Upload;

