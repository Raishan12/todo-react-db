import todoSchema from "../models/todo.model.js"

export const addtask = async(req, res)=>{
    try {
        const { task } = req.body
        const data = await todoSchema.create({task})
        res.status(201).send({success: true, data})
    } catch (error) {
        res.status(500).send({message: "Internal Error"})
    }
}

export const gettasks = async(req, res)=>{
    try {
        const data = await todoSchema.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({message: "Internal Error"})
    }
}

export const edittask = async(req, res)=>{
    try {
        const { id } = req.params
        const { task } = req.body
        const data = await todoSchema.findByIdAndUpdate({_id : id},{ task }, { new : true })
        res.status(200).send({success: true, data})       
    } catch (error) {
        res.status(500).send({message: "Internal Error"})
    }
}

export const changestatus = async (req, res)=>{
    try {
        const { id } = req.params
        const { status } = req.body
        const data = await todoSchema.findByIdAndUpdate({_id : id},{ status }, { new : true })
        res.status(200).send({success: true, data}) 
    } catch (error) {
        res.status(500).send({message: "Internal Error"})
    }
}

export const deletetask = async(req, res)=>{
    try {
        const { id } = req.params
        console.log(id)
        const data = await todoSchema.findByIdAndDelete({ _id : id })
        res.status(200).send({success: true, data})       
    } catch (error) {
        res.status(500).send({message: "Internal error"})
    }
}