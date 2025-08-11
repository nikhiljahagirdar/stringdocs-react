import React from "react";
import { useParams } from "react-router-dom";
import PdfViewer from "../../components/common/pdfViewer/PdfViewer";

function ViewPdf() {
  const { id } = useParams();
  console.log("passed id is",id);

  const url = `http://localhost:8000/pdf/get_pdf/${id}`

  return (
    <div className="w-full flex justify-center items-center h-screen">
      {id && <PdfViewer pdfUrl={url} />}
      
    </div>
  );
}

export default ViewPdf;
