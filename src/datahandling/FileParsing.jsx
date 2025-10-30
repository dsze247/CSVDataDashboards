import { useState } from "react";
import Papa from "papaparse";
import "./FileParsing.css";

function FileParsing(props) {
  const [file, setFile] = useState(null); // the name of the current file I want to parse
  const [uploadError, setUploadError] = useState(""); // if there is an uploading error, the error would be stored here
  const expectedColumns = ["date", "product", "quantity", "revenue"]; // the expected column values to compare to the passed in headers

  const handleFileUpload = (event) => {
    // sets the file to parse to the newly inputted file and clears the currently stored data
    setFile(event.target.files[0]);
    props.onValueChange([[], []]);
  };

  const handleFileParse = (event) => {
    // checks for errors, parses through the inputed file, sets new data and headers
    if (!file) {
      setUploadError("No file has been inputed");
      return;
    }
    if (!file.name.endsWith(".csv")) {
      setUploadError("File is not of type '.csv'");
      return;
    }

    setUploadError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields.map((field) => ({
          header: field.charAt(0).toUpperCase() + field.slice(1),
          accessorKey: field,
        }));

        const hasValidColumns =
          results.meta.fields.length === expectedColumns.length &&
          results.meta.fields.every(
            (h, i) => h.toLowerCase() === expectedColumns[i]
          );

        if (!hasValidColumns) {
          setUploadError("File has incorrect columns");
          return;
        }

        props.onValueChange([results.data, headers]);
      },
    });
  };

  return (
    <div className="fileHandling">
      <input type="file" className="fileInput" onChange={handleFileUpload} />
      <button className="parsingButton" type="button" onClick={handleFileParse}>
        Parse File
      </button>
      {uploadError && <p className="errorMessage">{uploadError}</p>}
    </div>
  );
}

export default FileParsing;
