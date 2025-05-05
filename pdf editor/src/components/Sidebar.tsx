import React from 'react';
import { 
  FileText, 
  FileOutput, 
  Type, 
  Pen, 
  PenTool, 
  Image, 
  FileImage, 
  ImagePlus, 
  PencilRuler, 
  Combine, 
  Scissors, 
  LayoutGrid, 
  RotateCw, 
  Minimize,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onToolSelect: (tool: string) => void;
  activeTool: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ onToolSelect, activeTool }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  
  const tools = [
    { id: 'convert-to-word', name: 'PDF to Word', icon: FileText },
    { id: 'convert-to-pdf', name: 'Word to PDF', icon: FileOutput },
    { id: 'add-text', name: 'Add Text', icon: Type },
    { id: 'edit-text', name: 'Edit Text', icon: Pen },
    { id: 'sign', name: 'Sign Document', icon: PenTool },
    { id: 'image-to-pdf', name: 'Image to PDF', icon: Image },
    { id: 'pdf-to-image', name: 'PDF to Image', icon: FileImage },
    { id: 'add-image', name: 'Add Image', icon: ImagePlus },
    { id: 'annotate', name: 'Annotate', icon: PencilRuler },
    { id: 'merge', name: 'Merge Files', icon: Combine },
    { id: 'split', name: 'Split File', icon: Scissors },
    { id: 'rearrange', name: 'Rearrange Pages', icon: LayoutGrid },
    { id: 'rotate', name: 'Rotate Pages', icon: RotateCw },
    { id: 'compress', name: 'Compress PDF', icon: Minimize },
  ];
  
  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h2 className="font-bold text-lg">PDF Tools</h2>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="py-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              className={`w-full flex items-center p-3 hover:bg-gray-700 transition-colors ${
                activeTool === tool.id ? 'bg-blue-700' : ''
              }`}
              onClick={() => onToolSelect(tool.id)}
            >
              <Icon size={20} />
              {!collapsed && <span className="ml-3">{tool.name}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};