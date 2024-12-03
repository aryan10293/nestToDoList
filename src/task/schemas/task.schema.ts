import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    id: { type: String, required: false }, 
    task: { type: String, required: true }, 
    completed: { type: Boolean, required: true, default: false }
});