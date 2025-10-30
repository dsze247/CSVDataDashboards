import FileParsing from "./datahandling/FileParsing";
import Data from "./datahandling/Data";
import { useState } from "react";
import "./DataHalf.css";

function DataHalf(props) {
  const handleClearFile = (event) => {
    props.onValueChange([[], []]);
  };

  return (
    <div className="dataHalf">
      <button className="clearButton" type="button" onClick={handleClearFile}>
        Clear File
      </button>
      <Data data={props.data} columns={props.columns} />
    </div>
  );
}

export default DataHalf;
