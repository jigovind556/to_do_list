import React, { useState, useEffect, useRef } from 'react';
import ListItem from './listItem';
import "../../css/task-list.css";

const TaskList = ({ usersData }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [firstUpdate,setftupdt]=useState(true);
  useEffect(() => {
    loadTasksFromLocalStorage();
  }, [usersData]); // Load tasks when usersData changes (i.e., when a user logs in or out)

  useEffect(() => {
    if (!firstUpdate){
      console.log("Task updated");
      saveTasksToLocalStorage();
    }
    else{
      setftupdt(false);
    }
  }, [tasks]);

  const loadTasksFromLocalStorage = () => {
    
    const storedTasks = localStorage.getItem(`tasks-${usersData.email}`); // Use user's email to distinguish tasks
    console.log(storedTasks);
    if (storedTasks) {
      const updatedTasks = JSON.parse(storedTasks);
      setTasks(updatedTasks);
    }
  };

  const saveTasksToLocalStorage = () => {
    console.log(`saving tasks to local storage`);
    localStorage.setItem(`tasks-${usersData.email}`, JSON.stringify(tasks)); // Use user's email to distinguish tasks
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, {
        text: taskInput,
        completed: false,
        timeAdded: Date.now(),
      }])
      setTaskInput('');
    }
  };

  const handleEditTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setEditingIndex(null);
    setTasks(updatedTasks);
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="list-unstyled">
        {tasks.map((task, index) => (
          <li key={index}>
            <ListItem
              task={task}
              onEdit={(newText) => handleEditTask(index, newText)}
              onToggleComplete={() => toggleCompleteTask(index)}
              onDelete={() => deleteTask(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
