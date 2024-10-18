import React from "react";
import TodoItem from "./TodoItem"
const TodoBoard = ({ todoList, onDelete, onComplete }) => {
  // console.log('todoList', todoList.length)
  return (
    <div>
      <h2>Todo List</h2>
      
      {todoList.length > 0 ? (
        // console.log('here')
        todoList.map((item,idx) => ( // map함수 소괄호!! 중괄호 아님!!
          <TodoItem item={item} key={idx} onDelete={onDelete} onComplete={onComplete}/>
        ))
      ) : (
        <h3>There is no Item to show</h3>  
      ) 
    }
    </div>
  )
}

export default TodoBoard;
