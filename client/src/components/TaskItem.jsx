// src/components/TaskItem.jsx
import React from 'react';


export default function TaskItem({ task, onToggle, onDelete }) {
const id = task._id || task.id || task._doc?._id;
return (
<div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
<input
type="checkbox"
checked={Boolean(task.completed)}
onChange={() => onToggle(id)}
/>
<div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</div>
<button onClick={() => onDelete(id)} style={{ marginLeft: 8 }}>Delete</button>
</div>
);
}