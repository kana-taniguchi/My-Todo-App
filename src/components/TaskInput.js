import React from 'react';

function TaskInput({ taskName, setTaskName, taskDate, setTaskDate, addTask, isEditMode, toggleEditMode, deleteSelectedTasks, selectedTasks, tasks, hasChanges, setIsEditMode, setSelectedTasks, setHasChanges }) {
  return (
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
  <>
    <button
      onClick={deleteSelectedTasks}
      disabled={selectedTasks.length === 0}
    >
      削除
    </button>
    <button
      onClick={() => {
        if (hasChanges) {
          // 完了処理（保存など）
          setIsEditMode(false);
          setSelectedTasks([]);
          setHasChanges(false);
        } else {
          // キャンセル処理
          setIsEditMode(false);
          setSelectedTasks([]);
        }
      }}
    >
      {hasChanges ? '完了' : 'キャンセル'}
    </button>
  </>
)}


    </div>
  );
}

export default TaskInput;
