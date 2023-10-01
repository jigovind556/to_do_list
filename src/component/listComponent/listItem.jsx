import React from 'react';
import "../../css/list-item.css";

const ListItem = ({ task, onEdit, onToggleComplete, onDelete }) => {
  const handleEditClick = () => {
    onEdit(task.id, "hello");
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>
      <div className="actions">
        <button className="edit-button" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
