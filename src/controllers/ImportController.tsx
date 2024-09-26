import { useState } from "react";
import { Import } from "../views/Import"

const acceptedFileTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]; // CSV and Excel MIME types
const maxRows = 35000;

export const ImportController = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const isValidType = acceptedFileTypes.includes(file.type);
      if (!isValidType) {
        setErrorMessage("Unsupported file type. Please select a CSV or Excel file.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
    }
  };

  // Handle file input click
  const handleBrowseClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <Import  />
      <input
        id="file-input"
        type="file"
        accept=".csv, .xlsx"
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFile && <p className="text-sm text-primary mt-4">Selected file: {selectedFile.name}</p>}
      {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};



