import express from "express"
import { addtask, deletetask, edittask, gettasks } from "../controller/todo.controller.js"

const todoRoutes = express.Router()

todoRoutes.post("/addtask",addtask)
todoRoutes.get("/gettasks",gettasks)
todoRoutes.post("/edittask/:id",edittask)
todoRoutes.get("/deletetask/:id",deletetask)


export default todoRoutes