import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Header.css';

export default function Header(props) {
  const { onSaveAs, dataset, onLoadAs, saveAs } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogLoad, setOpenDialogLoad] = React.useState(false)
  const [fileName, setFileName] = React.useState(dataset[0].fileName); //default is always population.json, but lets remove it to ''
  const [saveAsFileName, setSaveAsFileName] = React.useState()

  const open = Boolean(anchorEl);

  //clicking on menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //closing on menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  //this raises flag the "load" button clicked on menu item
  const handleLoadClick = () => {
    setAnchorEl(null);
    // setOpenDialogLoad(true);
    setOpenDialogLoad(true);  //calls the dialog to open for load instructions
    setSaveAsFileName(fileName)
    // Close the dialog after saving
  }

  //this raises flag the "SaveAs" button clicked on menu item
  const handleSaveAsClick = () => {
    setAnchorEl(null);
    //but this means after a close, we want to bring back the oldFileName
    setOpenDialog(true); //calls the dialog to open for save as instructions
    setSaveAsFileName(fileName)
    setFileName('')
  };

  //pressed save on menu items
  const handleSaveClick = () => {
    setAnchorEl(null)
    saveAs(fileName)

  }

  //If any other button is clicked, close all dialog
  const handleDialogClose = () => {
    //only two items have dialog, both will need to be closed.
    setOpenDialog(false);
    setOpenDialogLoad(false);
    setFileName(saveAsFileName)
  };

  //when the "load" button is pressed during a dialog
  const handleDialogLoadConfirm = () => {
    onLoadAs(fileName)
    setOpenDialogLoad(false);
  }
  //when the "Save" button is pressed during a dialog
  const handleDialogSaveAsConfirm = () =>{
    onSaveAs(fileName)
    setOpenDialog(false)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            size="large"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            File
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLoadClick}>Load</MenuItem>
            <MenuItem onClick={handleSaveClick}>Save</MenuItem>
            <MenuItem onClick={handleSaveAsClick}>Save As</MenuItem>
            {/* <MenuItem onClick={handleClose}>Save</MenuItem> */}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Project 1: angelpg
          </Typography>
        </Toolbar>
      </AppBar>

  <Dialog fullWidth open={openDialogLoad} onClose={handleDialogClose}>
  <DialogTitle>Load</DialogTitle>
  <DialogContent>
    <DialogContentText>Load a selected JSON file:</DialogContentText>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}
      label="File Name"
    >
      {dataset.map((item, index) => (
        <MenuItem key={index} value={item.fileName}>
          {item.fileName}
        </MenuItem>
      ))}
    </Select>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleDialogLoadConfirm}>Load</Button>
  </DialogActions>
</Dialog>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Save As</DialogTitle>
        <DialogContent>
          <DialogContentText>Rewrite a new JSON filename:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            // defaultValue=""
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSaveAsConfirm}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
