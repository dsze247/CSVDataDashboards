import { useState } from "react";
import Papa from 'papaparse';
import './FileParsing.css'

function FileParsing(props) {
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const expectedColumns = ["date","product","quantity","revenue"]

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        props.onValueChange([[], []]);
    }

    const handleFileParse = (event) => {
        if (!file) {
            setUploadError("No file has been inputed");
            return;
        } 
        if (!file.name.endsWith('.csv')) {
            setUploadError("File is not of type '.csv'");
            return;
        }

        setUploadError("")
        Papa.parse(file, {
            header:true,
            skipEmptyLines:true,
            complete: (results) => {
                const headers = results.meta.fields.map((field) => ({
                    header: field,
                    accessorKey: field,
                }));
        
                const hasValidColumns = results.meta.fields.length === expectedColumns.length &&
                                        results.meta.fields.every((h, i) => h.trim().toLowerCase() === expectedColumns[i]);

                if (!hasValidColumns) {
                    setUploadError("File has incorrect columns");
                    return;
                }

                props.onValueChange([results.data, headers]);
            }
        });
    }

    return (
        <div className="fileHandling">
            <input
                type="file"
                className="fileInput"
                onChange={handleFileUpload}
            />
            <button
                className="parsingButton"
                type="button"
                onClick={handleFileParse}
            >Parse File</button>
            {uploadError && <p className="errorMessage">{uploadError}</p>}
        </div>
    );
}

export default FileParsing