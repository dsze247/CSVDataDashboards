import { BarChart, LineChart } from '@mui/x-charts';
import React, { useState } from 'react';
import './DataVisualization.css';

function DataVisualization(props) {
  const [checkboxStates, setCheckboxStates] = useState([false, false, false]); // [Revenue, Quantity, Line]

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  // --- Data preparation ---
  const revenueByProduct = props.data.reduce((acc, row) => {
    const product = row.product;
    const revenue = Number(row.revenue || 0);
    acc[product] = (acc[product] || 0) + revenue;
    return acc;
  }, {});

  const quantityByProduct = props.data.reduce((acc, row) => {
    const product = row.product;
    const quantity = Number(row.quantity || 0);
    acc[product] = (acc[product] || 0) + quantity;
    return acc;
  }, {});

  const revenueByDate = props.data.reduce((acc, row) => {
    const date = row.date;
    const revenue = Number(row.revenue || 0);
    acc[date] = (acc[date] || 0) + revenue;
    return acc;
  }, {});

  const productLabels = Object.keys(revenueByProduct);
  const revenuesBP = Object.values(revenueByProduct);
  const quantity = Object.values(quantityByProduct);

  const dateLabels = Object.keys(revenueByDate).sort();
  const revenueOT = dateLabels.map(date => Number(revenueByDate[date] || 0));

  // --- Dynamically size charts ---
  const activeCharts = checkboxStates.filter(Boolean).length;
  const chartHeight = activeCharts === 1 ? 400 : activeCharts === 2 ? 300 : 250;

  return (
    <div className="layout">
      {props.data.length > 0 && (
        <>
          {/* Checkbox controls */}
          <div className="controls">
            <label className="viewOption">
              <input
                type="checkbox"
                checked={checkboxStates[0]}
                onChange={() => handleCheckboxChange(0)}
              />
              Revenue by Product
            </label>
            <label className="viewOption">
              <input
                type="checkbox"
                checked={checkboxStates[1]}
                onChange={() => handleCheckboxChange(1)}
              />
              Quantity Sold by Product
            </label>
            <label className="viewOption">
              <input
                type="checkbox"
                checked={checkboxStates[2]}
                onChange={() => handleCheckboxChange(2)}
              />
              Revenue Over Time
            </label>
          </div>

          {/* Chart area */}
          <div className={`charts charts-${activeCharts}`}>
            {checkboxStates[0] && (
              <div className="chartBox">
                <BarChart
                  xAxis={[{ data: productLabels, label: 'Product' }]}
                  series={[{ data: revenuesBP, label: 'Total Revenue ($)' }]}
                  height={chartHeight}
                />
              </div>
            )}

            {checkboxStates[1] && (
              <div className="chartBox">
                <BarChart
                  xAxis={[{ data: productLabels, label: 'Product' }]}
                  series={[{ data: quantity, label: 'Quantity Sold' }]}
                  height={chartHeight}
                />
              </div>
            )}

            {checkboxStates[2] && (
              <div className="chartBox">
                <LineChart
                  xAxis={[
                    {
                      data: dateLabels.map((date) => new Date(date)),
                      label: 'Date',
                      scaleType: 'time',
                    },
                  ]}
                  series={[{ data: revenueOT, label: 'Revenue Over Time ($)' }]}
                  height={chartHeight}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DataVisualization;
