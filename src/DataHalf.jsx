import FileParsing from "./datahandling/FileParsing";
import Data from "./datahandling/Data";
import { useState } from "react";
import "./DataHalf.css";

function DataHalf(props) {
  const [parsedData, setParsedData] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);

  const handleParsedData = (data) => {
    setParsedData(data[0]);
    setDataColumns(data[1]);
    props.onValueChange([data[0], data[1]]);
  };

  return (
    <div className="dataHalf">
      <FileParsing onValueChange={handleParsedData} />
      <Data data={parsedData} columns={dataColumns} />
    </div>
  );
}

export default DataHalf;
