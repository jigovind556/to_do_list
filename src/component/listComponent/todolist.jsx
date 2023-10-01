import React, { useState, useEffect } from 'react';
import ListItem from './listItem'; // Make sure to provide the correct import path
import "../../css/task-list.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log("Task updated");
    saveTasksToLocalStorage();
  }, [tasks]);

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    console.log(storedTasks);
    if (storedTasks) {
        // var oldTasks = [...tasks];

        var updatedTasks=JSON.parse(storedTasks);
        
        setTasks([...tasks,...updatedTasks]);
        
      console.log("this is : "+tasks);
    }
  };

  // const loadTasksFromLocalStorage = () => {
  //   const storedTasks = localStorage.getItem('tasks');
  //   if (storedTasks) {
  //     const updatedTasks = JSON.parse(storedTasks);
  //     setTasks(updatedTasks);
  //     console.log(tasks);
  //   }
  // };

  const saveTasksToLocalStorage = () => {
       console.log(`saving tasks to local storage`);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, {
         text: taskInput, 
         completed: false ,
         timeAdded: Date.now(),
    }])
      setTaskInput('');
      // saveTasksToLocalStorage();
    }
  };

  const handleEditTask = (index, newText) =>{
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setEditingIndex(null);
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
