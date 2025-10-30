import { useState } from "react";
import DataHalf from "./DataHalf";
import DataVisualization from "./DataVisualization";
import './CSVDataDashboard.css'

function CSVDataDashboard() {
    const [parsedData, setParsedData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);

    const handleParsedData = (data) => {
        setParsedData(data[0])
        setDataColumns(data[1])
    }

    return (
        <>
            <h1 className="appTitle">CSV Data Dashboard</h1>
            <div className="dashboardBody">
                <DataHalf onValueChange={handleParsedData}/>
                <DataVisualization data={parsedData} columns ={dataColumns}/>
            </div>
        </>
    );
}

export default CSVDataDashboard