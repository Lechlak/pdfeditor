import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ToolHeader } from './ToolHeader';
import { PDFPreview } from './PDFPreview';

type Tool = 
  | 'convert-to-word'
  | 'convert-to-pdf'
  | 'add-text'
  | 'edit-text'
  | 'sign'
  | 'image-to-pdf'
  | 'pdf-to-image'
  | 'add-image'
  | 'annotate'
  | 'merge'
  | 'split'
  | 'rearrange'
  | 'rotate'
  | 'compress';

export const EditorWorkspace: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const toolHeaders = {
    'convert-to-word': 'Convert PDF to Word',
    'convert-to-pdf': 'Convert Word to PDF',
    'add-text': 'Add Text to PDF',
    'edit-text': 'Edit PDF Text',
    'sign': 'Sign PDF Document',
    'image-to-pdf': 'Convert Image to PDF',
    'pdf-to-image': 'Convert PDF to Image',
    'add-image': 'Add Image to PDF',
    'annotate': 'Annotate PDF',
    'merge': 'Merge PDF Files',
    'split': 'Split PDF File',
    'rearrange': 'Rearrange PDF Pages',
    'rotate': 'Rotate PDF Pages',
    'compress': 'Compress PDF'
  };
  
  const handleToolSelect = (tool: Tool) => {
    setActiveTool(tool);
  };
  
  const handleFileUpload = (newFile: File) => {
    setFile(newFile);
  };
  
  return (
    <section id="editor" className="min-h-screen bg-gray-100">
      <div className="h-full flex">
        {/* Sidebar */}
        <Sidebar onToolSelect={handleToolSelect} activeTool={activeTool} />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {activeTool ? (
            <>
              {/* Tool header */}
              <ToolHeader 
                title={toolHeaders[activeTool]} 
                onFileUpload={handleFileUpload}
                file={file}
              />
              
              {/* Document preview */}
              <div className="flex-1 p-4">
                <PDFPreview file={file} activeTool={activeTool} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Tool to Begin</h2>
                <p className="text-gray-600 mb-6">
                  Choose a tool from the sidebar to start editing your PDF document.
                  You can convert, edit, annotate, and more!
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(toolHeaders).slice(0, 6).map(([key, title]) => (
                    <button
                      key={key}
                      className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm text-gray-700"
                      onClick={() => handleToolSelect(key as Tool)}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};