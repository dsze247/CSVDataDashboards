import { useState } from "react";
import DataHalf from "./DataHalf";
import DataVisualization from "./datahandling/DataVisualization";
import "./CSVDataDashboard.css";
import FileParsing from "./datahandling/FileParsing";

function CSVDataDashboard() {
  const [parsedData, setParsedData] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);

  const handleParsedData = (data) => {
    setParsedData(data[0]);
    setDataColumns(data[1]);
  };

  return (
    <>
      <h1 className="appTitle">CSV Data Dashboard</h1>
      {parsedData.length === 0 ? (
        <div className="fileinput">
          <FileParsing onValueChange={handleParsedData} />
        </div>
      ) : (
        <div className="dashboardBody">
          <DataHalf
            onValueChange={handleParsedData}
            data={parsedData}
            columns={dataColumns}
          />
          <DataVisualization data={parsedData} columns={dataColumns} />
        </div>
      )}
    </>
  );
}

export default CSVDataDashboard;
