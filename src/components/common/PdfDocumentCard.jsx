import React, { useState } from "react";
import {
  CheckCircle,
  Hourglass,
  XCircle,
  File,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PdfDocumentCard = ({ docData }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigator=useNavigate();

  if (!docData) {
    return <p className="text-gray-500 dark:text-gray-400">No document data available.</p>;
  }

  const {doc_id, filename, filepath, status, ...qcParams } = docData;
  console.log(docData)

  const getStatusDetails = (status) => {
    switch (status) {
      case "uploaded":
        return { text: "Uploaded", color: "green", icon: CheckCircle };
      case "processing":
        return { text: "Processing", color: "yellow", icon: Hourglass };
      case "failed":
        return { text: "Failed", color: "red", icon: XCircle };
      case "completed":
        return { text: "Completed", color: "blue", icon: CheckCircle };
      default:
        return { text: "Unknown", color: "gray", icon: File };
    }
  };

  const statusDetails = getStatusDetails(status);
  const hasQcParameter = (paramName) => qcParams[paramName];
  const handleViewPdf = () =>{
        window.location=`/user/view-pdf/?id=${doc_id}`
  };

  const Pill = ({ color, text }) => (
    <span
      className={`inline-flex items-center rounded-full bg-${color}-100 px-2.5 py-0.5 text-xs font-medium text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`}
    >
      {text}
    </span>
  );

  const QcPill = ({ label, value }) => (
    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-300 mr-2 mb-2">
      {label}: <span className={`ml-1 font-semibold text-${value ? "green" : "red"}-500`}>{value ? "Yes" : "No"}</span>
    </span>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out p-6 flex flex-col justify-between h-full">
      <div>
        <div className="w-full flex items-center justify-between">
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 truncate">{filename}</h5>
          <div className="relative flex justify-end">
            <button
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
              aria-label="Open menu"
              type="button"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <circle cx="19" cy="12" r="2" fill="currentColor" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        alert("Menu Item 1 clicked");
                        setShowMenu(false);
                      }}
                    >
                      Menu Item 1
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        alert("Menu Item 2 clicked");
                        setShowMenu(false);
                      }}
                    >
                      Menu Item 2
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        alert("Menu Item 3 clicked");
                        setShowMenu(false);
                      }}
                    >
                      Menu Item 3
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <span className="text-gray-700 dark:text-gray-300 font-medium mr-2">Status:</span>
          <span className={`inline-flex items-center rounded-full bg-${statusDetails.color}-100 px-2.5 py-0.5 text-xs font-medium text-${statusDetails.color}-800 dark:bg-${statusDetails.color}-900 dark:text-${statusDetails.color}-300`}>
            <statusDetails.icon className="h-4 w-4 mr-1" />
            {statusDetails.text}
          </span>
        </div>
        <div className="flex flex-wrap mb-4">
          {hasQcParameter("is_security") && <QcPill label="Security" value={hasQcParameter("is_security")} />}
          {hasQcParameter("is_encrypted") && <QcPill label="Encrypted" value={hasQcParameter("is_encrypted")} />}
          {hasQcParameter("has_bookmarks") && <QcPill label="Bookmarks" value={hasQcParameter("has_bookmarks")} />}
          {hasQcParameter("has_tags") && <QcPill label="Tags" value={hasQcParameter("has_tags")} />}
          {hasQcParameter("has_media") && <QcPill label="Media" value={hasQcParameter("has_media")} />}
          {hasQcParameter("has_images") && <QcPill label="Images" value={hasQcParameter("has_images")} />}
          {hasQcParameter("has_fonts") && <QcPill label="Fonts" value={hasQcParameter("has_fonts")} />}
          {hasQcParameter("has_tables") && <QcPill label="Tables" value={hasQcParameter("has_tables")} />}
          {hasQcParameter("has_links") && <QcPill label="Links" value={hasQcParameter("has_links")} />}
          {hasQcParameter("has_annotations") && <QcPill label="Annotations" value={hasQcParameter("has_annotations")} />}
          {hasQcParameter("has_form_fields") && <QcPill label="Form Fields" value={hasQcParameter("has_form_fields")} />}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          onClick={handleViewPdf}
        >
          <File className="h-5 w-5 mr-2" />
          View PDF
        </button>
        {/* Add more buttons here if needed */}
      </div>
    </div>
  );
};

export default PdfDocumentCard;