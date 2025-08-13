import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // タスク追加
  const addTask = () => {
    if (taskName.trim() && taskDate) {
      const newTask = { name: taskName, date: taskDate };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskDate('');
    }
  };

  // 編集モード切り替え
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedTasks([]);
  };

  // チェックボックス選択
  const toggleSelect = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter(i => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  // 一括削除
  const deleteSelectedTasks = () => {
    const newTasks = tasks.filter((_, i) => !selectedTasks.includes(i));
    setTasks(newTasks);
    setSelectedTasks([]);
    setIsEditMode(false);
  };

  return (
    <div className="App">
      <h1>React学習用ToDoアプリ</h1>

      <div className="input-area">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="タスク名を入力"
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <button onClick={addTask}>追加</button>
        {tasks.length > 0 && !isEditMode && (
          <button onClick={toggleEditMode}>編集</button>
        )}
        {isEditMode && (
          <button onClick={deleteSelectedTasks} disabled={selectedTasks.length === 0}>
            削除
          </button>
        )}
      </div>

      <table className="task-table">
        <thead>
          <tr>
            {isEditMode && <th className="select-col">選択</th>}
            <th>日付</th>
            <th>タスク名</th>
          </tr>
        </thead>
        <tbody>
  {tasks.map((task, index) => (
    <tr key={index} className={selectedTasks.includes(index) ? 'selected' : ''}>
      {isEditMode && (
        <td className="select-col">
          <input
            type="checkbox"
            checked={selectedTasks.includes(index)}
            onChange={() => toggleSelect(index)}
          />
        </td>
      )}
      <td>{task.date}</td>
      <td>{task.name}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default App;
