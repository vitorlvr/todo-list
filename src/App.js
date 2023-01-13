import './App.css';

import { userState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = userState("");
  const [time, setTime] = userState("");
  const [todo, setTodos] = userState([]);
  const [loading, setLoading] = userState(false);

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React todo</h1>
      </div>
      <div className='form-todo'>
        <p>Formulário</p>
      </div>
      <div className='list-todo'>
        <h2>Lista de tarefas:</h2>
        {todo.lenght === 0 && <p>Não há tarefas!</p>}
      </div>
    </div>
  );
}

export default App;
