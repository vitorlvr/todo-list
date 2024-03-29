import './App.css';

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const res = await fetch(API + "/todos");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      _id: Date.now().toString(),
      title,
      time,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      }
    });

    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  const handleDelete = async (_id) => {
    try {
      await fetch(`${API}/todos/${_id}`, {
        method: "DELETE",
      });
  
      setTodos((prevState) => prevState.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (todo) => {
    todo.done = !todo.done;

    try {
      await fetch(API + "/todos/" + todo._id, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "content-type": "application/json",
        },
      });

      setTodos((prevState) =>
        prevState.map((t) => (t._id === todo._id ? todo : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1>To-do List</h1>
      </div>
      <div className="form-todo">
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer</label>
            <input
              type="text"
              name="title"
              placeholder="Título da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input
              type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>
      <div className="list-todo">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className="todo" key={todo._id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className="actions">
              <span onClick={() => handleEdit(todo)}>
                {todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
