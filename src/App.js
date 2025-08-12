import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // タスク追加
  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  // タスク削除
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>React学習用ToDoアプリ</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.
            target.value)}
          placeholder="タスクを入力"
        />
        <button onClick={addTask}>追加</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
