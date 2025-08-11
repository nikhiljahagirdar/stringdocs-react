import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupDialog from '../../components/common/PopupDialog';
// Import React Icons
import { FaFilePdf, FaEye, FaDownload } from 'react-icons/fa';
import { MdOutlineAssessment } from 'react-icons/md';
import PdfQCReport from '../../components/qc/qcreport';
const MyFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileId,setFileId]=useState(null);
    const [showReport, setShowReport] = useState(false);
    

    const API_URL = 'https://hammerhead-app-mtxys.ondigitalocean.app/pdf/getpds';

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(API_URL);
            setFiles(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching files:', err);
            setError('Failed to load files. Please try again later.');
            setLoading(false);
        }
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleAction = (action, fileId) => {
        switch (action) {
            case 'viewPdf':
                window.location.href = `/user/view-pdf/${fileId}`;
                break;
            case 'seeQcReport':
                 setShowReport(true)
                break;
            case 'downloadQcReport':
                console.log(`Downloading QC report for file ID: ${fileId}`);
                alert(`Downloading QC report for file ID: ${fileId}`);
                break;
            default:
                break;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full text-gray-500">
                Loading files...
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Files</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {files.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">No files found.</p>
                ) : (
                    files.map(file => (
                        <div key={file.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-3">
                                        <FaFilePdf className="text-red-500 text-3xl" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[12rem]" title={file.original_filename}>
                                                {file.original_filename}
                                            </h3>
                                            <p className="text-sm text-gray-500">{formatBytes(file.size)}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            title="View PDF"
                                            className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            onClick={() => handleAction('viewPdf', file.id)}
                                        >
                                            <FaEye className="text-lg" />
                                        </button>
                                        <button
                                            title="See QC Report"
                                            className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            onClick={() => handleAction('seeQcReport', file.id)}
                                        >
                                            <MdOutlineAssessment className="text-lg" />
                                        </button>
                                        
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full 
                                        ${file.status === 'uploaded' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                        {file.status}
                                    </span>
                                    <p className="mt-2 text-sm text-gray-600">{file.status_message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <PopupDialog isOpen={showReport} onClose={() => setShowReport(false)} className={"w-500 max-h-screen"}>
                <PdfQCReport file_id={fileId} />
            </PopupDialog>

        </div>
    );
};

export default MyFiles;