import React, { useState, useRef } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import format from 'date-fns/format';
import 'react-datepicker/dist/react-datepicker.css'
import Stack from '@mui/material/Stack';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';


function App() {


  const [uInput, setUInput] = useState({
    date: new Date(),
    description: '',
    priority: ''
  })

  const setDate = (props) => {
    setUInput({ ...uInput, date: props })

  }

  const [todos, setTodos] = useState([])

  const inputChange = (event) => {
    setUInput({ ...uInput, [event.target.name]: event.target.value })
  }

  const handleClick = (event) => {
    event.preventDefault()
    setTodos([...todos, uInput])
  }

  const columns = [
    { headerName: 'Date', field: 'date', sortable: 'true', filter: 'true', floatingFilter: true, animateRows: true,
     valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy") },
    { headerName: 'Description', field: 'description', sortable: 'true', filter: 'true', floatingFilter: true, animateRows: true },
    {
      headerName: 'Priority', field: 'priority', sortable: 'true', filter: 'true', floatingFilter: true, animateRows: true,
      cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'blue' }
    }
  ]

  const gridRef = useRef()

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }
    else {
      alert('Select row first');
    }
  }

  return (
    <div className="App">

      <header className="App-header">
        <p> Simple To Do List App
        </p>
      </header>

   
        <div>
          <p>Add to do</p>

          

          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">

          <LocalizationProvider dateAdapter={AdapterDayjs}>

<DesktopDatePicker
  label="Date"
  inputFormat="DD/MM/YYYY"
  value={uInput.date}
  renderInput={(props) => <TextField {...props} />}
  onChange={date => {
    setDate(date)
  }
  }
/>
</LocalizationProvider>

            <TextField
              label="Description"
              variant="standard"
              name="description"
              value={uInput.description}
              onChange={inputChange} />

            <TextField
              label="Priority"
              variant="standard"
              name="priority"
              value={uInput.priority}
              onChange={inputChange} />



            <Button variant="outlined" onClick={handleClick}>Add</Button>


            <Button variant="outlined" color="secondary"
              onClick={deleteTodo} endIcon={<DeleteTwoToneIcon />} >Delete  </Button>


          </Stack>


          <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>

            <AgGridReact
              ref={gridRef}
              onGridReady={params => gridRef.current = params.api}
              rowSelection="single"
              columnDefs={columns}
              rowData={todos}>

            </AgGridReact>

          </div >
        </div>

    </div>

  )

}


export default App;
