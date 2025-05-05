import React from 'react';
import { FeatureCard } from './FeatureCard';
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
  Minimize 
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Convert PDF to Word',
      description: 'Transform PDFs into editable DOC/DOCX files while preserving layout and fonts.',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Convert Word to PDF',
      description: 'Turn DOC/DOCX files into professional PDFs with formatting intact.',
      icon: FileOutput,
      color: 'bg-purple-500'
    },
    {
      title: 'Add Text',
      description: 'Insert customizable text with font options, colors, and positioning.',
      icon: Type,
      color: 'bg-teal-500'
    },
    {
      title: 'Change Text',
      description: 'Edit existing PDF text, changing fonts, sizes, and colors without reformatting.',
      icon: Pen,
      color: 'bg-indigo-500'
    },
    {
      title: 'Sign Document',
      description: 'Add legally binding signatures by typing, drawing, or uploading.',
      icon: PenTool,
      color: 'bg-rose-500'
    },
    {
      title: 'Convert Image to PDF',
      description: 'Transform JPG/PNG images into PDFs while maintaining resolution.',
      icon: Image,
      color: 'bg-amber-500'
    },
    {
      title: 'Convert PDF to Image',
      description: 'Extract PDF pages as high-quality JPG/PNG images.',
      icon: FileImage,
      color: 'bg-lime-500'
    },
    {
      title: 'Add Image',
      description: 'Insert logos, photos, or graphics into your PDFs with precise positioning.',
      icon: ImagePlus,
      color: 'bg-emerald-500'
    },
    {
      title: 'Annotate',
      description: 'Mark up PDFs with drawing tools, highlighting, and erasers.',
      icon: PencilRuler,
      color: 'bg-cyan-500'
    },
    {
      title: 'Merge Files',
      description: 'Combine multiple PDFs into a single document with reordering options.',
      icon: Combine,
      color: 'bg-violet-500'
    },
    {
      title: 'Split File',
      description: 'Divide PDFs into multiple documents by selecting specific pages.',
      icon: Scissors,
      color: 'bg-fuchsia-500'
    },
    {
      title: 'Rearrange Pages',
      description: 'Reorganize pages with drag-and-drop, including delete and duplicate options.',
      icon: LayoutGrid,
      color: 'bg-orange-500'
    },
    {
      title: 'Rotate Pages',
      description: 'Adjust page orientation for better viewing with instant preview.',
      icon: RotateCw,
      color: 'bg-sky-500'
    },
    {
      title: 'Compress',
      description: 'Reduce file size while maintaining quality with multiple compression levels.',
      icon: Minimize,
      color: 'bg-red-500'
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful PDF Tools at Your Fingertips
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Edit, convert, and manipulate your PDF files with our comprehensive suite of tools.
          </p>
        </div>

        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};