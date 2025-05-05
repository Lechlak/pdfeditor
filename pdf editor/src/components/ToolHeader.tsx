import React from 'react';
import { Upload, Download, HelpCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface ToolHeaderProps {
  title: string;
  onFileUpload: (file: File) => void;
  file: File | null;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ title, onFileUpload, file }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pdfBytes = await pdfDoc.save();
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace(/\.[^/.]+$/, '') + '_edited.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        
        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload file
          </button>
          
          {file && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="mr-2 h-4 w-4" />
              Download result
            </button>
          )}
          
          <button
            className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {file && (
        <div className="mt-2 flex items-center">
          <span className="text-sm text-gray-500">Current file: </span>
          <span className="ml-1 text-sm font-medium text-gray-700">{file.name}</span>
          <span className="ml-2 text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span>
        </div>
      )}
    </div>
  );
};