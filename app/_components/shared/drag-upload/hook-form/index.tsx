import { color } from "@/constants";
import { Close } from "@mui/icons-material";
import { Container, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { MdOutlineRestore } from "react-icons/md";

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
        className="p-0.5 cursor-pointer"
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

const DragUploadHookForm = ({
  name: name,
  hookFormGetValues,
  hookFormResetField,
  register,
  required,
  hookFormWatch,
  hookFormErrors,
  defaultValue,
  isDragUploadEmployeeEdit,
  hookFormSetValue,
}: {
  onFileChange?: (file: File | null) => void;
  name?: string;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  hookFormGetValues?: UseFormGetValues<FieldValues>;
  hookFormResetField?: UseFormResetField<FieldValues>;
  hookFormWatch?: UseFormWatch<FieldValues>;
  hookFormErrors?: FieldErrors<FieldValues>;
  defaultValue?: string | number;
  isDragUploadEmployeeEdit?: boolean;
  hookFormSetValue?: UseFormSetValue<FieldValues>;
}) => {
  const file = hookFormWatch?.(name ?? "");
  const fileSet = file?.length > 0;
  const [_defaultValue, setDefaultValue] = useState(defaultValue);

  const handleRemoveFile = () => {
    if (isDragUploadEmployeeEdit) {
      hookFormSetValue?.(name ?? "", undefined, {
        shouldDirty: false,
      });
    } else {
      hookFormResetField?.(name ?? "");
    }
  };

  useEffect(() => {
    if (defaultValue) {
      if (file !== defaultValue) {
        setDefaultValue(undefined);
      } else {
        setDefaultValue(defaultValue);
      }
    }
  }, [file, defaultValue]);

  return (
    <>
      <Container
        style={{
          marginBottom: "3px",
          padding: "10px",
          border: "2px dashed #DFDFDF",
          cursor: fileSet ? "default" : "pointer",
          maxWidth: "none",
        }}
        onClick={
          fileSet
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
            {...register?.(name ?? "", {
              required:
                (!fileSet || !hookFormGetValues?.(name ?? "")) &&
                required &&
                `${name} is required`,
              value: defaultValue,
            })}
          />
          {hookFormGetValues?.(name ?? "")?.length > 0 ? (
            <div>
              <AddedFile
                name={
                  typeof _defaultValue === "string"
                    ? _defaultValue.length === 0
                      ? hookFormGetValues?.(name ?? "")?.[0]?.name
                      : _defaultValue
                    : (_defaultValue ??
                      hookFormGetValues?.(name ?? "")?.[0]?.name)
                }
                onRemoveClick={handleRemoveFile}
              />
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
      {isDragUploadEmployeeEdit &&
        hookFormGetValues?.(name ?? "") === undefined && (
          <div
            className="cursor-pointer flex items-center gap-2 mt-2"
            style={{ color: color.info.dark }}
            onClick={() =>
              hookFormResetField?.(name ?? "", {
                keepDirty: false,
                defaultValue: defaultValue,
              })
            }
          >
            <MdOutlineRestore /> Reset
          </div>
        )}
      {hookFormErrors && name && hookFormErrors[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof hookFormErrors[name].message === "string" &&
            hookFormErrors[name].message}
        </FormHelperText>
      )}
    </>
  );
};

export default DragUploadHookForm;
