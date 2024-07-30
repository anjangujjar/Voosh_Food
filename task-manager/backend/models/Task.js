const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    column: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('tasks', TaskSchema);
