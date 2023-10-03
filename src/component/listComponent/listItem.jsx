import React, { useState } from 'react';
import "../../css/list-item.css";

const ListItem = ({ task, onEdit, onToggleComplete, onDelete }) => {
  const [toggle, setToggle] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditClick = () => {
    if (editedText.trim() !== '') {
      onEdit(editedText);
    }
    setToggle(false);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className="list-item">
      <input
        type="checkbox"
        className='list-item-checkbox'
        style={{ position: "static" }}
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      {toggle ? (
        <div>
          <input
            type='text'
            id='editText'
            value={editedText}
            onChange={handleTextChange}
          />
          <button className="edit-button" onClick={handleEditClick}>
            Set
          </button>
        </div>
      ) : (
        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
          {task.text}
        </span>
      )}
      <div className="actions">
        {toggle ? (
          <button className="edit-button" onClick={handleEditClick}>
            Set
          </button>
        ) : (
          <button className="edit-button" onClick={changeToggle}>
            Edit
          </button>
        )}
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
