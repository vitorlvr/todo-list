const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); // Importe o modelo
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/banco-de-dados', { useNewUrlParser: true, useUnifiedTopology: true });

// Rotas
app.get('/todos', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/todos', async (req, res) => {
  const { title, time } = req.body;
  console.log(req.body);
  const newTask = new Task({ title, time, done: false });
  await newTask.save();
  res.json(newTask);
});

app.put('/todos/:_id', async (req, res) => {
  const { _id } = req.params;
  const { done } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(_id, { done }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/todos/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(_id);
    
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task não encontrada' });
    }

    res.json({ message: 'Task deletada com sucesso', deletedTask });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
