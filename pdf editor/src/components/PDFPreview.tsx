import React, { useEffect, useState } from 'react';
import { FileText, FileWarning } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFPreviewProps {
  file: File | null;
  activeTool: string;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ file, activeTool }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const arrayBuffer = e.target.result as ArrayBuffer;
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          setTotalPages(pdfDoc.getPageCount());
          
          // Create URL for preview
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          
          return () => URL.revokeObjectURL(url);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  const renderToolSpecificUI = () => {
    switch (activeTool) {
      case 'add-text':
        return (
          <div className="absolute top-4 left-4 p-3 bg-white shadow-md rounded-md border border-gray-200">
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Text Options</h3>
              <div className="grid grid-cols-2 gap-2">
                <select className="text-sm border border-gray-300 rounded-md">
                  <option>Arial</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-md">
                  <option>8 pt</option>
                  <option>10 pt</option>
                  <option>12 pt</option>
                  <option>14 pt</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 border border-gray-300 rounded">B</button>
                <button className="p-1 border border-gray-300 rounded">I</button>
                <button className="p-1 border border-gray-300 rounded">U</button>
                <input type="color" className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      
      case 'annotate':
        return (
          <div className="absolute top-4 left-4 p-3 bg-white shadow-md rounded-md border border-gray-200">
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Annotation Tools</h3>
              <div className="flex space-x-2">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  Draw
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  Highlight
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  Rectangle
                </button>
                <input type="color" className="w-8 h-8" />
              </div>
            </div>
          </div>
        );
        
      case 'rearrange':
        return (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-white shadow-md rounded-md border border-gray-200">
            <div className="flex space-x-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-24 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 cursor-move hover:border-blue-500 transition-colors"
                >
                  {index + 1}
                </div>
              ))}
              <div className="w-16 h-24 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200">
                +
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center p-6">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No file selected</h3>
          <p className="mt-1 text-sm text-gray-500">Upload a file to begin editing</p>
        </div>
      </div>
    );
  }
  
  if (file.type === 'application/pdf' && pdfUrl) {
    return (
      <div className="h-full relative">
        <div className="mx-auto max-w-4xl h-full flex flex-col">
          <div className="bg-gray-100 border border-gray-300 rounded shadow-sm p-4 h-full flex items-center justify-center relative">
            <iframe
              src={`${pdfUrl}#page=${currentPage}`}
              className="w-full h-full bg-white shadow-md"
              title="PDF Preview"
            />
            {renderToolSpecificUI()}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 border border-gray-300 rounded text-sm bg-white disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm">{currentPage}</span>
              <button
                className="px-2 py-1 border border-gray-300 rounded text-sm bg-white disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (file.type.includes('image')) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <img 
          src={URL.createObjectURL(file)} 
          alt="Preview" 
          className="max-h-full max-w-full object-contain"
          onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
        />
      </div>
    );
  }
  
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <FileWarning className="mx-auto h-12 w-12 text-amber-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Preview not available</h3>
        <p className="mt-1 text-sm text-gray-500">File type not supported for preview</p>
      </div>
    </div>
  );
}