import React, {useState, useRef} from 'react';
import './App.css';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
// date-fns

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import Stack from'@mui/material/Stack';

function App() {
  const [uInput, setUInput] = useState({
    date: new Date(),
    description:'',
    priority:''
    })

  const setDate = (props) => {
    setUInput({...uInput,  date : props })
    
  }

  const [todos, setTodos] = useState([]) 

  const inputChange = (event) => {
      setUInput({...uInput, [event.target.name]:event.target.value})
  }

  const handleClick = (event) => {  
    event.preventDefault()  
    setTodos([...todos,uInput]) 
  }

  const columns = [
    {headerName:'Date',field:'date', sortable: 'true', filter:'true', floatingFilter: true,animateRows:true},
    {headerName:'Description',field:'description', sortable: 'true', filter:'true', floatingFilter: true,animateRows:true},
    {headerName:'Priority',field:'priority', sortable: 'true', filter:'true', floatingFilter: true,animateRows:true,
  cellStyle : params => params.value==="High" ? {color: 'red'} : {color:'blue'}}
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
      
        <p>Add to do</p>
        <DatePicker
           label ="Date"  
         dateFormat='dd/MM/yyyy'
           selected= {uInput.date}
           onChange={ date =>{
             setDate(date) 
            }
           }
            /> 
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center"> 
        
          <label>Description:</label>
          <input type="text" name="description" value={uInput.description} onChange={inputChange}/>
          <label>Priority:</label>
          <input type="text" onChange={inputChange} name="priority" value={uInput.priority}/>
         
        <button onClick={handleClick}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
        </Stack>
       

     <div className="ag-theme-material" style={{height:'500px'}}> 

     <AgGridReact  
      ref={gridRef} 
      onGridReady={ params => gridRef.current = params.api } 
      rowSelection="single" 
      columnDefs={columns}  
      rowData={todos}>

        </AgGridReact>
 
      </div >
      
    </div>
  )
}
  
export default App;