import React, { useState } from 'react';
import "../../css/list-item.css";

const ListItem = ({ task, onEdit, onToggleComplete, onDelete }) => {
  const [toggle,setToggle]=useState(false);
  const handleEditClick = () => {
    var txt=document.getElementById('editText').value;
    if (txt.trim() !== '') {
      onEdit(txt);
    }
    
    setToggle(false);
    document.getElementById('editText').value="";
  };

  const handleDeleteClick = () => {
    onDelete(task.id);

    
  };
  const changeToggle=()=>{
    setToggle(!toggle);
  }

  return (
    <div className="list-item">
      <input
        type="checkbox"
        className='list-item-checkbox'
        style={{position:"static"}}
        
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      {toggle?
      <input type='text' id='editText'/>
      :<span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>}
      <div className="actions">
        {toggle?<button className="edit-button" onClick={handleEditClick}>
          Set
        </button>
        :<button className="edit-button" onClick={changeToggle}>
          Edit
        </button>}
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
