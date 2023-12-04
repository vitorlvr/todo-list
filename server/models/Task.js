const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  time: String,
  done: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
