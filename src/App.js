import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskSorter from './components/TaskSorter';
import TaskTable from './components/TaskTable';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [sortKey, setSortKey] = useState('dateAsc');
  const [hasChanges, setHasChanges] = useState(false);


  useEffect(() => {
  const savedTasks = localStorage.getItem('my-todo-tasks');
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);
useEffect(() => {
  localStorage.setItem('my-todo-tasks', JSON.stringify(tasks));
}, [tasks]);


  const addTask = () => {
    if (taskName.trim() && taskDate) {
      const newTask = { name: taskName, date: taskDate, isDone: false };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskDate('');
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedTasks([]);
  };

  const toggleSelect = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter(i => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

const toggleDone = (index) => {
  const updatedTasks = [...tasks];
  updatedTasks[index].isDone = !updatedTasks[index].isDone;
  setTasks(updatedTasks);
  setHasChanges(true); // 変更があったことを記録
};

  const deleteSelectedTasks = () => {
    const newTasks = tasks.filter((_, i) => !selectedTasks.includes(i));
    setTasks(newTasks);
    setSelectedTasks([]);
    setIsEditMode(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortKey) {
      case 'dateAsc':
        return new Date(a.date) - new Date(b.date);
      case 'dateDesc':
        return new Date(b.date) - new Date(a.date);
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="App">
      <h1>React学習用ToDoアプリ</h1>
      <TaskInput
        taskName={taskName}
        setTaskName={setTaskName}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
        addTask={addTask}
        isEditMode={isEditMode}
        toggleEditMode={toggleEditMode}
        deleteSelectedTasks={deleteSelectedTasks}
        selectedTasks={selectedTasks}
        tasks={tasks}
          hasChanges={hasChanges}
        setIsEditMode={setIsEditMode}
        setSelectedTasks={setSelectedTasks}   
  setHasChanges={setHasChanges}        
      />
      <TaskSorter sortKey={sortKey} setSortKey={setSortKey} />
      <TaskTable
        tasks={sortedTasks}
        isEditMode={isEditMode}
        selectedTasks={selectedTasks}
        toggleSelect={toggleSelect}
        toggleDone={toggleDone}
      />
    </div>
  );
}

export default App;
