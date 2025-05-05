import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, Upload, File } from 'lucide-react';

export const DropZone: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10485760, // 10MB
  });
  
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 transition-all ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
      }`}
    >
      {!file ? (
        <div className="text-center">
          <FileUp className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm text-gray-600 justify-center">
            <label className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
              <span>Upload a file</span>
              <input {...getInputProps()} className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PDF, DOC, DOCX, JPG or PNG up to 10MB
          </p>
        </div>
      ) : (
        <div className="text-center">
          <File className="mx-auto h-12 w-12 text-blue-500" />
          <p className="mt-2 text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
          <div className="mt-4 flex justify-center space-x-2">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              Change file
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={(e) => {
                e.stopPropagation();
                // Process file logic here
              }}
            >
              <Upload className="mr-1 h-4 w-4" />
              Process file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};