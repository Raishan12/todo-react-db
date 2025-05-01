import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"

function App() {

  const [input, setInput] = useState("")
  const [edittask, setEdit] = useState(false)
  const [editid, setEditid] = useState("")
  const [data, setData] = useState([])
  const [reload, setReload] = useState(true)
  const [status, setStatus] = useState(false)


  useEffect(() => {
    loadData()
  }, [reload])

  async function loadData() {
    try {
      const res = await axios.get("http://localhost:3000/api/todo/gettasks")
      await setData(res.data)
    } catch (error) {
      console.log("Failed to Fetch")
    }
  }

  async function changeStatus(id, newStatus) {
    try {
      const res = await axios.post(`http://localhost:3000/api/todo/changestatus/${id}`, { status: newStatus });
      setReload(reload === true ? false : true)
    } catch (error) {
      console.log("Failed to change status", error);
    }
  }

  function edit(index) {
    setEdit(true)
    setInput(data[index].task)
    setEditid(data[index]._id)
  }

  async function del(id) {
    try {
      const res = await axios.get(`http://localhost:3000/api/todo/deletetask/${id}`)
      console.log(res)
      setReload(reload === true ? false : true)
    } catch (error) {
      console.log("Failed to Fetch")
    }
  }


  const sendData = async () => {
    if (!input)
      return alert("Please add a task")
    try {
      const task = input

      if (edittask === true) {
        const id = editid
        const res = await axios.post(`http://localhost:3000/api/todo/edittask/${id}`, { task })
        setEditid("")
        setEdit(false)
        setInput("")
        setReload(reload === true ? false : true)

      } else {
        const res = await axios.post("http://localhost:3000/api/todo/addtask", { task })
        console.log(res)
        setInput("")
        setReload(reload === true ? false : true)
      }
    } catch (error) {
      console.log("Failed to Send:", error)
    }

  }
  return (
    <div className='container'>
      <div className="wrap">
        <div className="submitarea">
          <input type="text" name="task" id="task" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendData}>{edittask == true ? "Save Task" : "Add Task"}</button>
        </div>
      </div>
      <div className="display">
        {
          data.map((todo, index) => (
            <div className="tasks" key={todo._id}>
              <input type="checkbox" name="check" id="check" checked={todo.status} onChange={(e) => { const newStatus = e.target.checked; setStatus(newStatus); changeStatus(todo._id, newStatus)}} />
              <span style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>{todo.task}</span>
              {/* <span>{todo.date}</span> */}
              <div className="buttons">
                <button onClick={() => edit(index)} className="edbtn">Edit</button>
                <button onClick={() => del(todo._id)} className="dlbtn">Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
