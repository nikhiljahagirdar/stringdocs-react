import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Using axios as requested

// API endpoints
const CONFIG_API_URL = 'https://hammerhead-app-mtxys.ondigitalocean.app/pdf-config/';
const UPLOAD_API_URL = 'https://hammerhead-app-mtxys.ondigitalocean.app/pdf/upload-pdf/';

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// The main App component
export default function ProcessPdf() {
  // Get the user ID from the Redux store as originally intended
  const userId = useSelector(state => state.auth.user.id);
  
  // State to hold the uploaded files and their configurations
  const [files, setFiles] = useState([]);
  
  // States for API-related actions
  const [availableConfigs, setAvailableConfigs] = useState([]);
  const [isLoadingConfigs, setIsLoadingConfigs] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [globalStatus, setGlobalStatus] = useState(null); // 'success', 'error', 'uploading'

  // This useEffect hook fetches configurations from the API.
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await axios.get(CONFIG_API_URL);
        
        // Map the API response to the format the component expects
        const formattedConfigs = response.data.map(config => ({
          id: config.id,
          label: config.configname,
        }));
        setAvailableConfigs(formattedConfigs);
      } catch (error) {
        console.error("Error fetching configurations:", error);
        setGlobalStatus('error');
      } finally {
        setIsLoadingConfigs(false);
      }
    };

    fetchConfigs();
  }, []);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    
    // Map over the new files to create a structured object for our state
    const filesWithConfigs = newFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      lastModified: new Date(file.lastModified).toLocaleDateString(),
      configs: [], // Initialize an empty array for configurations
      status: 'pending' // Add a status for each new file
    }));

    setFiles(prevFiles => [...prevFiles, ...filesWithConfigs]);
    setGlobalStatus(null);
  };

  // Function to handle config button clicks for a specific file.
  // It correctly toggles the selection, allowing for multiple configurations per file.
  const handleConfigChange = (fileIndex, configId) => {
    setFiles(prevFiles => {
      // Use map to create a new array with the updated file object
      return prevFiles.map((file, index) => {
        if (index === fileIndex) {
          const isSelected = file.configs.includes(configId);
          // Create a new configs array based on whether the config was selected
          const newConfigs = isSelected
            ? file.configs.filter(id => id !== configId)
            : [...file.configs, configId];
          // Return a new file object with the updated configs array
          return { ...file, configs: newConfigs };
        }
        return file;
      });
    });
  };

  // Function to remove a file from the list before upload
  const handleRemoveFile = (fileIndex) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== fileIndex));
  };
  
  // Function to handle the form submission (e.g., pushing data to an API)
  const handleUpload = async () => {
    setIsUploading(true);
    setGlobalStatus('uploading');

    // Use Promise.allSettled to handle each upload independently
    const uploadPromises = files.map((fileData, index) => {
      // Update the status of the individual file to 'uploading'
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index].status = 'uploading';
        return updatedFiles;
      });

      const formData = new FormData();
      // Add the user ID to the form data
      formData.append('user_id', userId);
      formData.append('files', fileData.file);
      formData.append('file_configurations', JSON.stringify(fileData.configs));

      return axios.post(UPLOAD_API_URL, formData)
        .then(response => {
          return { fileIndex: index, status: 'success' };
        })
        .catch(error => {
          console.error(`Upload failed for ${fileData.name}:`, error);
          return { fileIndex: index, status: 'error' };
        });
    });

    // Wait for all uploads to complete
    const results = await Promise.allSettled(uploadPromises);

    // Update state based on individual results
    let hasError = false;
    setFiles(prevFiles => {
      return prevFiles.map((file, index) => {
        const result = results.find(res => res.value.fileIndex === index);
        if (result && result.value.status === 'success') {
          return { ...file, status: 'success' };
        } else {
          hasError = true;
          return { ...file, status: 'error' };
        }
      });
    });

    setIsUploading(false);
    setGlobalStatus(hasError ? 'error' : 'success');
  };
  
  // Conditionally apply card styles based on file status
  const getCardStyles = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-gray-100 border-gray-300';
      case 'uploading':
        return 'bg-blue-100 border-blue-500 ring-4 ring-blue-200 animate-pulse';
      case 'success':
        return 'bg-green-100 border-green-500 ring-4 ring-green-200';
      case 'error':
        return 'bg-red-100 border-red-500 ring-4 ring-red-200';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // Check if at least one file has a selected configuration to enable the upload button
  const hasSelectedConfigs = files.some(file => file.configs.length > 0);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8 font-sans antialiased">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          PDF Uploader
        </h1>
        
        {/* File Input Section */}
        <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-2xl transition duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-50">
          <label htmlFor="file-upload" className="block text-center cursor-pointer p-4">
            <span className="text-2xl font-bold text-gray-600">
              Drag & Drop PDFs
            </span>
            <span className="block text-sm text-gray-500 mt-2">
              or click to browse your files
            </span>
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              accept=".pdf" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Display uploaded files and their configurations */}
        {isLoadingConfigs ? (
          <div className="text-center py-12 text-gray-500 text-lg">
            Loading configurations...
          </div>
        ) : (
          files.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-700">
                Uploaded PDFs
              </h2>
              {globalStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative mb-4" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline ml-2">All files were uploaded successfully.</span>
                </div>
              )}
              {globalStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-4" role="alert">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline ml-2">Some uploads failed. Please check the individual file statuses.</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file, fileIndex) => (
                  <div 
                    key={fileIndex} 
                    className={`p-6 rounded-2xl border-2 shadow-md flex flex-col transition-all hover:shadow-xl relative ${getCardStyles(file.status)}`}
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFile(fileIndex)}
                      disabled={isUploading}
                      className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                      aria-label="Remove file"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* File Header (Name & Status) */}
                    <div className="flex justify-between items-start mb-4 pr-8">
                      <span className="font-semibold text-gray-800 text-lg break-all">
                        {file.name}
                      </span>
                      <span className={`px-3 py-1 ml-2 text-xs font-bold rounded-full uppercase tracking-wider ${
                        file.status === 'pending' ? 'bg-gray-200 text-gray-800' :
                        file.status === 'uploading' ? 'bg-blue-200 text-blue-800' :
                        file.status === 'success' ? 'bg-green-200 text-green-800' :
                        file.status === 'error' ? 'bg-red-200 text-red-800' : ''
                      }`}>
                        {file.status}
                      </span>
                    </div>
                    
                    {/* File Details */}
                    <div className="text-sm text-gray-500 mb-4 space-y-1">
                      <p>
                        <span className="font-medium">Size:</span> {formatFileSize(file.size)}
                      </p>
                      <p>
                        <span className="font-medium">Added:</span> {file.lastModified}
                      </p>
                    </div>

                    {/* Configuration Toggle Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      {availableConfigs.map(config => (
                        <button
                          key={config.id}
                          onClick={() => handleConfigChange(fileIndex, config.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                            file.configs.includes(config.id)
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                          disabled={isUploading}
                        >
                          {config.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        
        {/* Status and Upload Button */}
        {files.length > 0 && (
          <div className="mt-8 text-center">
            {globalStatus === 'uploading' && (
              <p className="text-blue-500 font-semibold mb-4 animate-pulse">
                Uploading files...
              </p>
            )}
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                disabled={isUploading || isLoadingConfigs || !hasSelectedConfigs}
                className={`w-full md:w-auto px-10 py-3 font-bold rounded-full shadow-lg transition-all transform hover:scale-105 ${isUploading || isLoadingConfigs || !hasSelectedConfigs ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'}`}
              >
                {isUploading ? 'Uploading...' : 'Upload All Files'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
