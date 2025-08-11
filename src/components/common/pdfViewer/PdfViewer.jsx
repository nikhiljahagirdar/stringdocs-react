import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import * as pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs";
import { Tree } from "primereact/tree";
import {
  FaSearch,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaCompress,
  FaExpand,
  FaFileAlt,
  FaListUl,
  FaArrowsAltH,
  FaCopy,
  FaFile,
} from "react-icons/fa";

//pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfViewer = ({ pdfUrl }) => {
  const containerRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [bookmarks, setBookmarks] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarMode, setSidebarMode] = useState("bookmarks");
  const [thumbnails, setThumbnails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [matches, setMatches] = useState([]);
  const [fitMode, setFitMode] = useState(null);
  const [viewMode, setViewMode] = useState("single");

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch(pdfUrl);
      const data = await response.arrayBuffer();
      const loadedPdf = await pdfjsLib.getDocument({ data }).promise;
      setPdfDoc(loadedPdf);
      setTotalPages(loadedPdf.numPages);
      setCurrentPage(1);

      const outline = await loadedPdf.getOutline();
      const bookmarkTree = transformOutlineToTree(outline);
      setBookmarks(bookmarkTree);

      const thumbs = [];
      for (let i = 1; i <= loadedPdf.numPages; i++) {
        const page = await loadedPdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        thumbs.push(canvas.toDataURL());
      }
      setThumbnails(thumbs);
    };

    fetchPdf();
  }, [pdfUrl]);

  const transformOutlineToTree = (outline) => {
    if (!outline) return [];
    return outline.map((item, index) => ({
      key: index.toString(),
      label: item.title,
      data: item,
      children: transformOutlineToTree(item.items || []),
    }));
  };

  const handleBookmarkClick = async (node) => {
    if (!node.data.dest) return;
    const dest = await pdfDoc.getDestination(node.data.dest);
    const pageNumber = (await pdfDoc.getPageIndex(dest[0])) + 1;
    setCurrentPage(pageNumber);
  };

  const renderPages = () => {
    if (viewMode === "all") {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PDFPage
            key={i}
            pageNumber={i}
            scale={scale}
            pdfDoc={pdfDoc}
            fitMode={fitMode}
            containerRef={containerRef}
          />
        );
      }
      return pages;
    } else {
      return (
        <PDFPage
          pageNumber={currentPage}
          scale={scale}
          pdfDoc={pdfDoc}
          fitMode={fitMode}
          containerRef={containerRef}
        />
      );
    }
  };

  const handleZoom = (delta) => {
    setFitMode(null);
    const newScale = Math.min(Math.max(scale + delta, 0.5), 3.0);
    setScale(newScale);
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFit = (mode) => {
    setFitMode(mode);
  };

  const handleSearch = async () => {
    const matchesFound = [];
    for (let i = 1; i <= totalPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join(" ");
      if (text.toLowerCase().includes(searchText.toLowerCase())) {
        matchesFound.push(i);
      }
    }
    setMatches(matchesFound);
    if (matchesFound.length > 0) setCurrentPage(matchesFound[0]);
  };

  return (
    <div className="flex h-screen w-full p-16">
      <div className=" flex flex-col overflow-hidden w-full">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-2 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center w-full">
            <div className="w-1/6">
            <button
              className="shadow-sm"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              {sidebarVisible ? <FaCompress /> : <FaExpand />}
            </button>
            </div>
            <div className="w-1/6">
              <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <FaArrowLeft />
            </button>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageChange}
              className="w-16 px-1 border rounded"
            />
            <span>/ {totalPages}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <FaArrowRight />
            </button>
            </div> 
           <div className="w-1/6">
             <button onClick={() => handleZoom(-0.25)}>
              <FaMinus />
            </button>
             <span>Zoom: {(scale * 100).toFixed(0)}%</span>
            <button onClick={() => handleZoom(0.25)}>
              <FaPlus />
            </button>
           </div>
           <div className="flex gap-2">
          
            <button title="Fit Width" onClick={() => handleFit("width")}>
              <FaArrowsAltH /> 
            </button>
            <button title="Continuous" onClick={() => handleFit("continuous")}>
              <FaCopy /> 
            </button>
            <button
              onClick={() => setViewMode(viewMode === "all" ? "single" : "all")}
            >
              <FaFile /> {viewMode === "all" ? "Single Page" : "All Pages"}
            </button>
          </div>
          <div className="flex gap-2 justify-end">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-2 py-1 border rounded"
            />
           </div>
            
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="flex flex-row w-full">
          {sidebarVisible && (
            <div className="w-64 border-r overflow-y-auto p-2 bg-white">
              <div className="flex justify-between mb-2">
                <button onClick={() => setSidebarMode("bookmarks")}>
                  <FaListUl />
                </button>
                <button onClick={() => setSidebarMode("thumbnails")}>
                  <FaFileAlt />
                </button>
              </div>
              {sidebarMode === "bookmarks" ? (
                <Tree value={bookmarks} onNodeSelect={handleBookmarkClick} />
              ) : (
                <ul className="grid grid-cols-1 gap-2">
                  {thumbnails.map((thumb, index) => (
                    <li
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <img
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className="border shadow rounded w-full object-contain"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div
            className="overflow-y-auto flex bg-gray-100 p-4 flex flex-col"
            ref={containerRef}
            style={{height:"100vh"}}
          >
            {renderPages()}
          </div>
        </div>
      </div>
    </div>
  );
};

const PDFPage = ({ pageNumber, scale, pdfDoc, fitMode, containerRef }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const renderPage = async () => {
      const page = await pdfDoc.getPage(pageNumber);
      const initialViewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let newScale = scale;
      if (fitMode && containerRef.current) {
        const container = containerRef.current;
        if (fitMode === "width") {
          newScale = container.clientWidth / initialViewport.width;
        }
      }

      const viewport = page.getViewport({ scale: newScale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
    };

    if (pdfDoc) renderPage();
  }, [pdfDoc, pageNumber, scale, fitMode]);

  return <canvas ref={canvasRef} className="mb-4 border shadow" />;
};

export default PdfViewer;
