import './Editor.css';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import React from 'react';

function Editor({ dataset, onTitleAs, onPointAs }) {
  // const [title, setTitle] = useState(dataset.title);
  // const [data, setData] = React.useState(dataset.data.map(point => ({ ...point }))); // copy test
  const data = dataset.data

  const handleTitleChange = (event) => {
    onTitleAs(event.target.value);
  };

  const handleDataPointChange = (newValue, index, key) => {
    if ((Number(newValue) && (key === dataset.axes.y)) || ((!Number(newValue) || Number(newValue)) && key === dataset.axes.x)  || Number(newValue) === 0) { //so any integer and rational is possible
      // console.log("Testing null value after removing all[2] " + newValue + " and index " + index, " and key ", key)
      const newData = [...data];
      newData[index][key] = newValue;
      onPointAs(newData);
    }
   
  };
  const handleDeletePoint = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    onPointAs(newData);
};
const handleAddPoint = () => {
    const newData = [...data, { [dataset.axes.x]: '', [dataset.axes.y]: '' }];
    onPointAs(newData);
  
};


  return (
    <div>
      <TextField
        fullWidth
        // label="Title"
        variant="outlined"
        value={dataset.title}
        onChange={handleTitleChange}
        placeholder='This is a placeholder title'
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{dataset.axes.x}</TableCell>
              <TableCell>{dataset.axes.y}</TableCell>
              <TableCell></TableCell> 
              {/* To last cell is simply to take up space to even table cells 3xn */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over the data and display rows */}
            {dataset.data.map((point, index) => (
              <TableRow key={index}>
                <TableCell>
                  {/* <TextField value={point.year|| ''} onChange={(event) => handleDataPointChange(event.target.value, index, dataset.axes.x)} /> */}
                  <TextField value={point[dataset.axes.x] || ''} onChange={(event) => handleDataPointChange(event.target.value, index, dataset.axes.x)} />
                </TableCell>
                <TableCell>
                  {/* <TextField value={point.population || ''} onChange={(event) => handleDataPointChange(event.target.value, index, dataset.axes.y)} /> */}
                  <TextField value={point[dataset.axes.y] || ''} onChange={(event) => handleDataPointChange(event.target.value, index, dataset.axes.y)} />
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => handleDeletePoint(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Button variant="contained" fullWidth onClick={handleAddPoint}>Add/Append Point</Button>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Editor;


