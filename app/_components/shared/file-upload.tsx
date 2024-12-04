import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

export const AttachmentUpload = ({ label, onChange, className }: {
  label?: string,
  onChange: (files: File[]) => void,
  className?: string
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const fileMap = new Map(selectedFiles.map((file) => [file.name, file]));
    newFiles.forEach((file) => {
      if (!fileMap.has(file.name)) {
        fileMap.set(file.name, file);
      }
    });

    const updatedFiles = Array.from(fileMap.values());
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleFileRemove = (file: File) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = prevSelectedFiles.filter((f) => f.name !== file.name);
      onChange(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-semibold text-black">{label}</p>
      <div className="space-y-1">
        <div className='flex flex-col border-dashed border-2 outline-none rounded-lg p-2 relative'>
          <div className='flex flex-wrap gap-2'>
            {selectedFiles.map((file) => (
              <div key={file.name} className='flex items-center bg-[#E6EBF9] rounded-full p-1 text-xs'>
                <span className='mr-2 truncate max-w-[150px] ml-1'>{file.name}</span>
                <button
                  type='button'
                  onClick={() => handleFileRemove(file)}
                  className='text-primary hover:text-primary'
                >
                  <IoCloseCircle size={20} />
                </button>
              </div>
            ))}
          </div>

          <button
            type='button'
            className='flex items-center justify-center text-center cursor-pointer outline-none border-none'
            onClick={() => document.getElementById('document-upload')?.click()}
          >
            {selectedFiles.length === 0 ? (
              <p className='text-sm text-gray-500'>
                click to upload
              </p>
            ) : (
              <p className='text-sm text-primary mt-2'>
                + Add more files
              </p>
            )}
          </button>

          <input
            id='document-upload'
            name='document-upload'
            type='file'
            multiple
            accept='.pdf'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
        <p className="text-[10px] text-gray-500">Attach any relevant file. Max file size allowed is 3MB.</p>
      </div>
    </div>
  )
}