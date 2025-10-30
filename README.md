# CSV Data Dashboard
This code allows someone to input a csv file containing a table with the columns: date, product, quantity, revenue. Then the program will show statistics and graphs related to the inputed file.

In order to run my code, you will require a couple external packages. Use these commands to download the required packages:

```
npm install papaparse
npm install @tanstack/react-table
npm install @mui/x-charts
```

## Code Breakdown
For this project I broke the goal down into two parts, functionality and UI. From there, I further broke down the functionality part into each of the separate components I want to implement.

#### Functionality Breakdown:
- Data Input
    - File chooser
    - Error handling
    - Parsing button
- Data Output
    - Data table
    - Basic statistics
- Data Visualization
    - Checkboxes
    - Charts

From the functionality breakdown I started to create the different components that I wanted. To do this I began with the beginning of the functionality breakdown.

### Data Input
For the data input I began with writing code to accept a file:
```
<input
    type="file"
    className="fileInput"
    onChange={handleFileUpload}
/>
```
This allowed me to accept a file, and when the file was selected, run some code. In my case updating the file I will be parsing and setting the current data in the system to none.

From there I implemented the parsing button. I knew I wanted this to also check for errors so when writing what would happen when the button was pressed, I added code such as:
```
if (!file) {
    setUploadError("No file has been inputed");
    return;
} 
```
From there I would either display the error using `{uploadError && <p className="errorMessage">{uploadError}</p>}`, or I would parse the file.

To parse the file I used the library Papaparse. I parsed the file and created to resulting arrays from it. One that contained the headers for each column and one that contained all the data in each row. Then I used the `.onValueChange()` method to provide the new data and headers to the rest of the components.

### Data Output
The data output contains two main parts. One is the data table showing a clean version of the raw data given in the CSV file, and the other is some basic stats.

To provide the data table I used the TanStack Table library. This allowed me to create a basic data table and create a clean visual for the application. I created a table onject using `useReactTable()` and then used that table to display the header values and the corrisponding data. For example to display the body of the table I used this code:
```
<tbody>
    {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
        {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
        ))}
        </tr>
    ))}
</tbody>
```
This code loops through the rows of data and for each row, loops throguh displaying each value.

For the basic statistics I used `.reduce()` to add up both the revenue from each sale and the quantity sold. Then I displayed those values along with the total number of sales in a simple box next to the data table.

```
const totRevenue = props.data.reduce(
    (acc, currRow) => acc + Number(currRow.revenue || 0), 0
);
```

### Data Visualization
The final part of the functionality is creating charts to visualize the collected data. To do this I imported the MUI X library and used the bar and line charts.

From there I created the graphs by first creating all the data sets nessesary. I used thr `.reduce()` method to create arrays for the total revenue by product, total quantity sold by product, and revenue by date. From there, I isolated the data for each axis and then inputed those axis data into the chart components.
```
<BarChart
    xAxis={[{ data: productLabels, label: 'Product' }]}
    series={[{ data: revenuesBP, label: 'Total Revenue ($)' }]}
    height={chartHeight}
/>
```
After creating all the charts, I then created the checkable boxes. These boxes were to be used to toggle the charts visibility. I created a hook for the states of the checked boxes. Then each time the value of a box is changed the function `handleCheckboxChange` is called.
```
const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
};
```
This creates a shallow copy of the checkbox states array and the changes the index of the specific box clicked and sets the hook to the new array. From there the specific boxes checked will be displayed.

## Styling
After creating all the functional components, I then turned to styling the web page. I created a hand drawn mock up of the web page and then through multiple iterations I slowly created the final product.

![hand drawn design](./process_pics/Screenshot%202025-10-30%20at%203.06.23 AM.png)
*hand drawn design*

![iteration 1](./process_pics/Screenshot%202025-10-30%20at%203.08.48 AM.png)
*iteration 1*

![iteration 2](./process_pics/Screenshot%202025-10-30%20at%203.09.20 AM.png)
*iteration 2*

![final design](./process_pics/Screenshot%202025-10-30%20at%2011.49.00 AM.png)
![final design](./process_pics/Screenshot%202025-10-30%20at%2011.57.17 AM.png)
*final design*

## Stratagies
When designing the webpage I often found myself using the inspect ability in my web browser to visualized the different components when tweaking the designs. For example when figuring out the best combination of margins and padding I would find the component in the inspect window and highlight the differentnt reigons.
![using the inspect tab for margins](./process_pics/Screenshot%202025-10-29%20at%208.39.47 PM.png)
*using the inspect tab for margins*

I also utilized the inspect tab when debugging my code. For example when working on the charts, I ran into an issue where the graph would appear, but the actual data would not show up on the chart. In order to fix this, I again used the inspect tool and outputed verious datasets to the console to see if there was a data problem. From there I found that the chart was reciving null data and from that realization I was able to fix the code and make the chart work correctly.
![using the inspect tab for debugging](./process_pics/Screenshot%202025-10-29%20at%208.40.02 PM.png)
*using the inspect tab for debugging*