import React from 'react';

function TaskSorter({ sortKey, setSortKey }) {
  return (
    <div className="sort-area">
      <label>並び替え：</label>
      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        <option value="dateAsc">日付昇順</option>
        <option value="dateDesc">日付降順</option>
        <option value="nameAsc">名前昇順</option>
        <option value="nameDesc">名前降順</option>
      </select>
    </div>
  );
}

export default TaskSorter;
