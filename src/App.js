
import './App.css';
import React from "react"
import BarChart from './BarChart.js';
import Header from './Header';
import Editor from './Editor.js';
import ScatterPlot from './ScatterPlot.js'
import { useEffect } from 'react';
//for testing purposes
// import datasetJSON from './population.json'
// import popluation from './population.json'
// import grades from './grades.json'


const population = {

  "fileName": "population.json",

  "axes": {

    "x": "year", 

    "y": "population"

  },

  "title": "World population",

  "data": [

    { "year": "1950", "population": 2.525 },

    { "year": "1960", "population": 3.018 },

    { "year": "1970", "population": 3.682 },

    { "year": "1980", "population": 4.440 },

    { "year": "1990", "population": 5.310 },

    { "year": "2000", "population": 6.127 },

    { "year": "2010", "population": 6.930 }

  ]

};

  const grades = {

    "title":"Grade Distribution",

    "fileName":"grades.json",

    "axes":{

        "x":"grade",

        "y":"count"

    },

    "data":[

        {"grade":"A","count":5},

        {"grade":"A-","count":10},

        {"grade":"B+","count":12},

        {"grade":"B","count":23},

        {"grade":"B-","count":7},

        {"grade":"C+","count":9},

        {"grade":"C","count":16},

        {"grade":"C","count":3},

        {"grade":"D+","count":8},

        {"grade":"D","count":11},

        {"grade":"D-","count":13},

        {"grade":"F","count":2}

    ]

};


localStorage.setItem("population.json", JSON.stringify(population))
localStorage.setItem("grades.json", JSON.stringify(grades))
// here if the names are the same, then localStorage handles replicates
// By overwriting files with the same name

// Here we want to be able to use these for load, save as, and save.
// Be default these reset because they are base cases (orginial)
const popItem = JSON.parse(localStorage.getItem("population.json"))
const gradeItem = JSON.parse(localStorage.getItem("grades.json"))


const App = () => {

  // const [currentFileName, setCurrentFileName] = React.useState(popItem.fileName)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [dataSet, setDataSet] = React.useState([popItem, gradeItem],[]);

  // lets try the inverse data flow with the title first
  
  // Get the current dataSet that contains all JSON files
  // Update the title to newTitle to the current file, currentIndex
  // Finishing updating dataSet
  const handleTitleAs = (newTitle) => {
    const updatedData = [...dataSet]
    updatedData[currentIndex].title = newTitle
    setDataSet(updatedData)
  }

  // Get the current dataSet that ...
  // Update the data with newArray passed up ...
  // Finishing updating...
  const handleDataPointAs = (newArray) => {
    const updatedData = [...dataSet]
    updatedData[currentIndex].data = newArray
    setDataSet(updatedData)
 
  }
  

  // Callback function to handle saving data with the filename
  const handleSaveAs = (enteredFileName) => {
    // Clone the current dataSet
    const updatedData = [...dataSet];
    
    // Get the index of the current item being modified
    // Clone the modified data for the current index
    const updatedSingleDataSet = { ...updatedData[currentIndex] };

    // Update the file name for the modified data
    updatedSingleDataSet.fileName = enteredFileName;

    // Check if the entered file name already exists in dataSet
    const existingIndex = updatedData.findIndex(item => item.fileName === enteredFileName);
    if (existingIndex === -1) {
        // If the file name doesn't exist, add the modified data with the new file name
        updatedData.push(updatedSingleDataSet);
        setDataSet(updatedData);
        setCurrentIndex(dataSet.length)
    } else {
        // If the file name already exists, update the existing data with the modified data
        updatedData[existingIndex] = updatedSingleDataSet;
        setDataSet(updatedData);
    }
    // Update localStorage
    localStorage.setItem(enteredFileName, JSON.stringify(updatedSingleDataSet));
};


  const handleLoad = (selectedFileName) => {
    //can I get index of the JSON object in dataSet?
    const index = dataSet.findIndex(item => item.fileName === selectedFileName); // Assuming 'fileName' is the key to identify the file in 'dataSet'
    setCurrentIndex(index);


    // If you want consistent data, that does not refresh until reloading page, remove below
    // Unless implementation to add clear button which acts as a refresh of the data set!
    const newJsonData = JSON.parse(localStorage.getItem(selectedFileName));
    dataSet[index] = newJsonData //this resets the data, because loading means you want to load!

  }
  // be default the currentIndex is what we save
  const handleSave = (selectedFileName) => {
    // get the data we just modified found in the current index
    const modifedData = dataSet[currentIndex]

    // set the old data with the new modifiedData
    // for localStorage
    localStorage.setItem(selectedFileName, JSON.stringify(modifedData));

    // and dataSet is updated

    // do we need a reset here?
    const newJsonData = JSON.parse(localStorage.getItem(selectedFileName));
    dataSet[currentIndex] = newJsonData //this resets the data, because loading means you want to load!
  }

  useEffect(() => {
    // Function to handle changes in localStorage
    const handleStorageChange = () => {
      //to avoid any error by injecting JSON files, update will only happen if successful...
      try {
        const storedData = Object.entries(localStorage).map(([key, value]) => JSON.parse(value));
        setDataSet(storedData);
        // Clear any previous errors if data retrieval is successful
      } catch (error) {
        setDataSet(storedData);
        // Set error state with the error message
        // Can be implemented...
        // But it will do nothing...
      }
    };

    // Initial retrieval of data from localStorage
    const storedData = Object.entries(localStorage).map(([key, value]) => JSON.parse(value));
    console.log(storedData)
    if (storedData.length > 0) {
      setDataSet(storedData);
    }

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <div className="App" >
      <Header onSaveAs={handleSaveAs} saveAs={handleSave} onLoadAs={handleLoad} dataset={dataSet}/>
      <div className='container'>
        <Editor dataset={dataSet[currentIndex]}  onTitleAs={handleTitleAs} onPointAs={handleDataPointAs}/>
        <div>
        <BarChart  dataset={dataSet[currentIndex]} />
        <ScatterPlot  dataset={dataSet[currentIndex]} />
        </div>
        
      </div>
      
    </div>
  );
}

export default App;

