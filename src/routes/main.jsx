import React from 'react';
import DefaultPage from '../component/default/default';
import ToDoList from '../component/listComponent/todolist';

const Main = ({islogged}) => {
  return (
    <div>
      {(!islogged)?<DefaultPage/>:
        <ToDoList/>}
    </div>
  );
}

export default Main;
