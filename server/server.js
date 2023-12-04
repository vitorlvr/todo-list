const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); // Importe o modelo
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('SUA_STRING_DE_CONEXAO_AQUI', { useNewUrlParser: true, useUnifiedTopology: true });

// Rotas
app.get('/todos', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/todos', async (req, res) => {
  const { title, time } = req.body;
  const newTask = new Task({ title, time, done: false });
  await newTask.save();
  res.json(newTask);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { done }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
