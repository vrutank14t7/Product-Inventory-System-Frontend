import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import BasicModal from "../Basic/BasicModal";
import { IconButton, useTheme } from "@mui/material";
import { FaEye } from "react-icons/fa";
import Pagination from "../Basic/Pagination";
import InputError from "../Basic/InputError";

const snakeToTitleCase = (snakeCaseStr) => {
  const words = snakeCaseStr.split("_");
  const titleCaseStr = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCaseStr;
};

const FileUpload = ({ multiple = false, defaultFiles = [], accept, inputName, handleChange, error }) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const theme = useTheme();

  const stopDefaults = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    if (multiple) {
      setFiles([...files, ...e.target.files]);
      handleChange(inputName, [...files, ...e.target.files]);
    } else {
      setFiles([e.target.files[0]]);
      handleChange(inputName, [e.target.files[0]]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    handleChange(
      inputName,
      files.filter((_, i) => i !== index)
    );
  };

  const renderFilePreview = (file, index) => {
    const fileURL = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/");

    return (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          marginTop: "1rem",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.2rem", alignItems: "center", overflow: "hidden" }}>
          {isImage && (
            <img
              src={fileURL}
              alt={`preview-${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.2rem", alignItems: "center", overflow: "hidden" }}>
          {file.name}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.2rem", alignItems: "center", overflow: "hidden" }}>
          <IconButton onClick={() => window.open(fileURL, "_blank")}>
            <FaEye color={theme.palette.warning.main} />
          </IconButton>
          <IconButton onClick={() => handleRemoveFile(index)}>
            <MdDelete color={theme.palette.error.main} />
          </IconButton>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (files.length === 0 && isModalOpen) {
      setIsModalOpen(false);
    }
    // eslint-disable-next-line
  }, [files]);

  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
      <div style={{ padding: "0.5rem 0px", color: theme.palette.secondary.main, borderRadius: "5px", border: "none" }}>
        {snakeToTitleCase(inputName)}
      </div>
      <div style={{ width: "auto", display: "inline-flex", gap: "0.5rem" }}>
        <div style={{ display: "inline-block" }}>
          <input
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
            id={inputName}
            style={{ display: "none" }}
          />
          <label
            htmlFor={inputName}
            onDragEnter={(e) => {
              stopDefaults(e);
              setIsDragOver(true);
            }}
            onDragLeave={(e) => {
              stopDefaults(e);
              setIsDragOver(false);
            }}
            onDragOver={stopDefaults}
            onDrop={(e) => {
              stopDefaults(e);
              setIsDragOver(false);
              if (multiple) {
                const selectedFiles = Array.from(e.dataTransfer.files);
                setFiles(selectedFiles);
                handleChange(inputName, selectedFiles);
              } else {
                setFiles([e.dataTransfer.files[0]]);
                handleChange(inputName, [e.dataTransfer.files[0]]);
              }
            }}
            style={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              cursor: "pointer",
              textAlign: "center",
              display: "inline-flex",
              padding: "0.5rem",
              ...(isDragOver && {
                backgroundColor: "#f0f0f0",
              }),
            }}
          >
            <div style={{ display: "none" }}>
              <MdOutlineFileUpload color={theme.palette.primary.main} />
            </div>
            <div style={{ pointerEvents: "none" }}>
              <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <MdOutlineFileUpload color={theme.palette.primary.main} size={20} />
              </div>
            </div>
          </label>
        </div>
        {files.length > 0 ? (
          <div style={{ cursor: "pointer" }} onClick={() => setIsModalOpen(true)}>
            <div
              style={{
                display: "inline-flex",
                padding: "0.5rem",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "10px",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IoIosEye color={theme.palette.warning.main} size={20} />
            </div>
          </div>
        ) : null}

        <BasicModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          child={
            <div>
              {files.length > 0 ? (
                <div style={{ width: "100%", borderCollapse: "collapse" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: theme.palette.secondary.main,
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    }}
                  >
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.2rem", alignItems: "center", overflow: "hidden" }}>Icon</div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.2rem", alignItems: "center", overflow: "hidden" }}>File Name</div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.2rem", alignItems: "center", overflow: "hidden" }}>Action</div>
                  </div>
                  {files
                    .slice(
                      currentPage * usersPerPage - usersPerPage,
                      currentPage * usersPerPage
                    )
                    .map((file, index) => renderFilePreview(file, index))}
                </div>
              ) : null}
              {files.length > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  totalItems={files.length}
                  itemsPerPage={usersPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setUsersPerPage}
                />
              ) : null}
            </div>
          }
        />
      </div>
      {error ? (
        <div style={{ textAlign: "center" }}>
          <InputError message={error} />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
