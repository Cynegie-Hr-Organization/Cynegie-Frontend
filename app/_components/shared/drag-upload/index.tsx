import { color } from "@/constants";
import { Close } from "@mui/icons-material";
import { Container, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

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
      className="w-fit p-1 px-4 flex items-center items-self-start gap-2"
      style={{
        backgroundColor: color.info.light,
        color: color.info.dark,
        borderRadius: "50px",
        borderRadius: "50px",
      }}
    >
      <div style={{ fontSize: "12px", fontWeight: "bold" }}>{props.name}</div>
      <div style={{ fontSize: "12px", fontWeight: "bold" }}>{props.name}</div>
      <Close
        onClick={props.onRemoveClick}
        className="p-0.5 cursor-pointer"
        sx={{
          width: "20px",
          height: "20px",
          width: "20px",
          height: "20px",
          color: color.info.light,
          borderRadius: "50%",
          borderRadius: "50%",
          backgroundColor: color.info.dark,
        }}
      />
    </div>
  );
};

const DragUpload = ({
  onFileChange,
  name,
  hookFormSetValue: setValue,
  hookFormGetValues,
  hookFormResetField,
  register,
  required,
  // hookFormWatch,
  hookFormErrors,
  hookFormClearErrors,
}: {
  onFileChange?: (file: File | null) => void;
  name?: string;
  hookFormSetValue?: UseFormSetValue<FieldValues>;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  hookFormGetValues?: UseFormGetValues<FieldValues>;
  hookFormResetField?: UseFormResetField<FieldValues>;
  hookFormWatch?: UseFormWatch<FieldValues>;
  hookFormErrors?: FieldErrors<FieldValues>;

  hookFormClearErrors?: UseFormClearErrors<FieldValues>;
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
      if (name) {
        setValue?.(name, selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileUrl(null);
    onFileChange?.(null);
    if (name) {
      hookFormResetField?.(name);
      hookFormClearErrors?.(name);
      // setValue?.(name, undefined);
    }
  };

  useEffect(() => {
    if (hookFormGetValues) {
      const file = hookFormGetValues(name ?? "");
      console.log(file);
      if (file) {
        setFile(file);
        setFileUrl(file.name);
      }
    }
  }, [hookFormGetValues, name]);

  return (
    <>
      <Container
        style={{
          marginBottom: "3px",
          padding: "10px",
          border: "2px dashed #DFDFDF",
          cursor: fileUrl ? "default" : "pointer",
          maxWidth: "none",
        }}
        onDragOver={fileUrl ? () => {} : (e) => e.preventDefault()}
        onDrop={fileUrl ? () => {} : handleFileDrop}
        onClick={
          fileUrl
            ? () => {}
            : () => document.getElementById(name ?? "fileInput")?.click()
        }
      >
        <div>
          <input
            type="file"
            id={name ?? "fileInput"}
            accept=".pdf, .doc, .docx"
            hidden
            {...(!register
              ? { onChange: handleFileSelect }
              : register(name ?? "", {
                  required:
                    // required
                    // ?
                    // &&
                    hookFormGetValues?.(name ?? "") === undefined &&
                    required &&
                    `${name} is required`,
                  // : false,
                  onChange: handleFileSelect,
                }))}
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
      {hookFormErrors && name && hookFormErrors[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof hookFormErrors[name].message === "string" &&
            hookFormErrors[name].message}
        </FormHelperText>
      )}
    </>
  );
};

export default DragUpload;
