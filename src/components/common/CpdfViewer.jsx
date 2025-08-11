import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import * as pdfglobal from "pdfjs-dist/build/pdf.worker.min.mjs";


// this is a working copy but only the zoom is not working
const CPdfViewer = ({ pdfUrl }) => {
  const containerRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(0.5);
  const [totalPages, setTotalPages] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch(pdfUrl, {
        headers: {
          Accept: "application/pdf",
        },
      });
      const data = await response.arrayBuffer();
      const loadedPdf = await pdfjsLib.getDocument({ data }).promise;
      setPdfDoc(loadedPdf);
      setTotalPages(loadedPdf.numPages);
      setCurrentPage(1);

      const outline = await loadedPdf.getOutline();
      setBookmarks(outline || []);
    };

    fetchPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfDoc) renderPage(currentPage);
  }, [pdfDoc, currentPage, scale]);

  const renderPage = async (num) => {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
  };

  const handleZoom = (delta) => {
    const newScale = Math.min(Math.max(scale + delta, 0.5), 3.0);
    setScale(newScale);
    console.log(newScale);
  };

  const handleBookmarkClick = async (item) => {
    if (!item.dest) return;
    const dest = await pdfDoc.getDestination(item.dest);
    const pageNumber = (await pdfDoc.getPageIndex(dest[0])) + 1;
    setCurrentPage(pageNumber);
  };

  const renderBookmarks = (items, level = 0) => {
    if (!items) return null;
    return (
      <ul className={`ml-${level * 4}`}>
      {items.map((item, idx) => (
        <li key={idx}>
        <button
          onClick={() => handleBookmarkClick(item)}
          className="bg-none border-none text-blue-500 cursor-pointer"
        >
          {item.title}
        </button>
        {renderBookmarks(item.items, level + 1)}
        </li>
      ))}
      </ul>
    );
  };

  return (
    <div className="flex w-full h-screen w-full p-24 ">
      {/* Sidebar for Bookmarks */}
     

      {/* PDF Viewer */}
      <div className="flex-1 p-2">
        <div
          className="mb-2 flex justify-between items-center"
        >
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ◀ Prev
            </button>
            <span className="mx-2">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next ▶
            </button>
          </div>
          <div>
            <button onClick={() => handleZoom(-0.25)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              -
            </button>
            <span className="mx-2">
              Zoom: {(scale * 100).toFixed(0)}%
            </span>
            <button onClick={() => handleZoom(0.25)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto h-full" style={{height:'100vh'}} >
          <canvas
          ref={canvasRef}
          className="border border-gray-300 w-full"
        />
        </div>
      </div>
    </div>
  );
};

export default CPdfViewer;
