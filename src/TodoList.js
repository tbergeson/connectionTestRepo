import React from 'react'
import Todo from "./Todo"
import "./styles/TodoList.css"

// This is a bit of a useless component, is only used once so could easily be written into the app code
export default function TodoList({ todos, dispatch }) {
  return (
    <div className="todoList">
      {todos.map(todo => 
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      )}
    </div>
  )
}
