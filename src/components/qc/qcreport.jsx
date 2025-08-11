import React, { useState, useEffect } from 'react';
import {
    FaFilePdf,
    FaCheckCircle,
    FaTimesCircle,
    FaLock,
    FaFileSignature,
    FaImage,
    FaFont,
    FaTable,
    FaLink,
    FaPencilAlt,
    FaWrench,
    FaBookmark,
    FaFilm,
    FaCalendarAlt,
    FaInfoCircle,
    FaPrint
} from 'react-icons/fa';
import axios from 'axios';
const PdfQCReport = ({ file_id }) => {
    // Display a message if no report data is provided
    const [reportData, setReportData] = useState({});

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl shadow-md max-w-sm mx-auto my-8 border border-gray-200">
                <FaInfoCircle className="text-5xl text-blue-400 mb-4" />
                <p className="text-gray-600 text-lg font-semibold">No PDF QC Report data available.</p>
                <p className="text-gray-500 text-sm mt-2 text-center">Please provide report data to display.</p>
            </div>
        );
    }

    useEffect(() => {

        async function fetchReport() {
            const result = await axios.get(`http://localhost:8000/http://localhost:8000/pdf-qc/qcByFile?file_id=${file_id}`);
            setReportData(result.data);
            console.log(result.data);
        }
        fetchReport();

    }, [file_id]);


    /**
     * Formats an ISO date string into a human-readable local date and time string.
     * @param {string} isoString - The ISO date string to format.
     * @returns {string} Formatted date string or 'N/A' if invalid.
     */
    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        try {
            const date = new Date(isoString);
            // Options for a more readable format
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            return date.toLocaleString(undefined, options);
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Invalid Date';
        }
    };

    /**
     * Reusable sub-component to display a feature item with an icon and a boolean value.
     * @param {object} props - The component props.
     * @param {React.ComponentType} props.icon - The React Icon component to display.
     * @param {string} props.label - The text label for the feature.
     * @param {boolean} props.value - The boolean value of the feature (true/false).
     */
    const FeatureItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center mb-2 p-2 rounded-md transition-colors duration-200 hover:bg-gray-50">
            {/* Icon with dynamic color based on value */}
            <Icon className={`mr-3 text-xl ${value ? 'text-green-500' : 'text-red-500'}`} />
            <span className="font-medium text-gray-700">{label}:</span>
            {/* Text 'Yes' or 'No' with dynamic color based on value */}
            <span className={`ml-2 font-semibold ${value ? 'text-green-600' : 'text-red-600'}`}>
                {value ? 'Yes' : 'No'}
            </span>
        </div>
    );

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-3xl mx-auto my-8 font-inter">
            {/* Report Header */}
            <div className="flex items-center justify-between border-b-2 border-blue-100 pb-4 mb-6">
                <div className="flex items-start">
                    <FaFilePdf className="text-6xl text-blue-600 mr-5 animate-pulse-slow" /> {/* Larger icon with subtle animation */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">PDF QC Report</h2>
                       
                    </div>
                </div>
                 <div className="flex items-end">
                     {/* Larger icon with subtle animation */}
                    <div>
                        <button onClick={()=>window.print()}><FaPrint/></button>
                       
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Security & Encryption Section */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2">Security & Encryption</h3>
                    <FeatureItem icon={FaLock} label="Password" value={reportData.is_encrypted} />
                </div>

                {/* Document Features Section */}
                <div className="bg-green-50 p-6 rounded-lg shadow-inner">
                    <h3 className="text-2xl font-bold text-green-800 mb-4 border-b border-green-200 pb-2">Document Features</h3>
                    <FeatureItem icon={FaBookmark} label="Bookmarks" value={reportData.has_bookmarks} />
                    <FeatureItem icon={FaFileSignature} label="Tags" value={reportData.has_tags} />
                    <FeatureItem icon={FaFilm} label="Media Content" value={reportData.has_media} />
                    <FeatureItem icon={FaImage} label="Images Included" value={reportData.has_images} />
                    <FeatureItem icon={FaFont} label="Embedded Fonts" value={reportData.has_fonts} />
                    <FeatureItem icon={FaTable} label="Tables Present" value={reportData.has_tables} />
                    <FeatureItem icon={FaLink} label="Hyperlinks" value={reportData.has_links} />
                    <FeatureItem icon={FaPencilAlt} label="Annotations" value={reportData.has_annotations} />
                    <FeatureItem icon={FaWrench} label="Form Fields" value={reportData.has_form_fields} />
                </div>
            </div>

            {/* Timestamps Section */}
            <div className="border-t-2 border-gray-100 pt-6 mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Timestamps</h3>
                <div className="flex items-center mb-3">
                    <FaCalendarAlt className="mr-3 text-2xl text-gray-500" />
                    <span className="font-medium text-gray-700">Created On:</span>
                    <span className="ml-2 text-gray-600 text-lg">{formatDateTime(reportData.createdon)}</span>
                </div>
                <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-2xl text-gray-500" />
                    <span className="font-medium text-gray-700">Updated On:</span>
                    <span className="ml-2 text-gray-600 text-lg">{formatDateTime(reportData.updatedon)}</span>
                </div>
            </div>
        </div>
    );
};

export default PdfQCReport;