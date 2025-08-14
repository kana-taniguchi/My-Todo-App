import React from 'react';

function TaskTable({ tasks, isEditMode, selectedTasks, toggleSelect, toggleDone }) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          {isEditMode && <th className="select-col">選択</th>}
          <th>完了</th>
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
<td>
  {isEditMode ? (
    <input
      type="checkbox"
      checked={task.isDone}
      onChange={() => toggleDone(index)}
    />
  ) : (
    <span style={{ color: task.isDone ? '#2e7d32' : '#c62828' }}>
      {task.isDone ? '完了' : '未完了'}
    </span>
  )}
</td>


            <td>{task.date}</td>
            <td
              style={{
                textDecoration: task.isDone ? 'line-through' : 'none',
                color: task.isDone ? '#888' : '#000'
              }}
            >
              {task.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
