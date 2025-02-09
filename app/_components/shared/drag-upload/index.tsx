import React, { useState } from "react";
import { Container } from "@mui/material";
import { color } from "@/constants";
import { Close } from "@mui/icons-material";

export const UploadFieldInfo: React.FC<{ text: string }> = ({ text }) => {
  return (
    <p style={{ color: "#303030", fontWeight: 400, fontSize: "10px" }}>
      {text}
    </p>
  );
};

export type AddedFileProps = { name?: string; onRemoveClick?: () => void };

export const AddedFile: React.FC<AddedFileProps> = (props) => {
  return (
    <div
      className="w-fit p-1 px-4 flex items-center items-self-start gap-2"
      style={{
        backgroundColor: color.info.light,
        color: color.info.dark,
        borderRadius: "50px",
      }}
    >
      <div style={{ fontSize: "12px", fontWeight: "bold" }}>{props.name}</div>
      <Close
        onClick={props.onRemoveClick}
        className="p-0.5"
        sx={{
          width: "20px",
          height: "20px",
          color: color.info.light,
          borderRadius: "50%",
          backgroundColor: color.info.dark,
        }}
      />
    </div>
  );
};

const DragUpload = ({
  onFileChange,
}: {
  onFileChange?: (file: File | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(selectedFile.name);
      onFileChange?.(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileUrl(null);
    onFileChange?.(null);
  };

  return (
    <>
      <Container
        style={{
          marginBottom: "3px",
          padding: "10px",
          border: "2px dashed #DFDFDF",
          cursor: "pointer",
          maxWidth: "none",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <div>
          <input
            type="file"
            id="fileInput"
            accept=".pdf, .doc, .docx"
            hidden
            onChange={handleFileSelect}
          />
          {fileUrl ? (
            <div>
              <AddedFile name={file?.name} onRemoveClick={handleRemoveFile} />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="card-subtitle-small">Upload File</p>
            </div>
          )}
        </div>
      </Container>
      <div className="mt-2">
        <UploadFieldInfo text="Attach any relevant file. Max file size allowed is 3MB" />
      </div>
    </>
  );
};

export default DragUpload;
