import express from "express"
import { addtask, changestatus, deletetask, edittask, gettasks } from "../controller/todo.controller.js"

const todoRoutes = express.Router()

todoRoutes.post("/addtask",addtask)
todoRoutes.get("/gettasks",gettasks)
todoRoutes.post("/edittask/:id",edittask)
todoRoutes.post("/changestatus/:id",changestatus)
todoRoutes.get("/deletetask/:id",deletetask)


export default todoRoutes