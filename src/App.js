import React, { useState, useEffect, useReducer } from "react";
import TodoList from "./TodoList.js"
import "./styles/App.css"

const LOCAL_STORAGE_KEY = "todoApp.todos";

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_TODO: 'toggle-todo',
  SET_TODOS: 'set-todos',
  CLEAR_TODOS: 'clear-todos',
  CLEAR_COMPLETED: 'clear-completed'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, { id: Date.now(), text: action.payload.name, completed: false }]
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) todo.completed = !todo.completed;
        return todo;
      })
    case ACTIONS.SET_TODOS:
      return [...action.payload.todos];
    case ACTIONS.CLEAR_TODOS:
      return [];
    case ACTIONS.CLEAR_COMPLETED:
      return todos.filter(todo => todo.completed !== true);
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [inputText, setInputText] = useState('');

  // Puts the todos variable into localStorage, and retrieves the variable on reload
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedTodos);
    if (storedTodos) dispatch({ type: ACTIONS.SET_TODOS, payload: { todos: storedTodos } })
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Event handler for the add button
  function handleAdd() {
    if (inputText.length > 0) dispatch({ type: ACTIONS.ADD_TODO, payload: {name: inputText} })
    setInputText("");
  }

  // Ensures that the input text is formatted correctly
  function verifyTextChange(e) {
    const value = e.target.value;
    if (value.length > 30) { return }
    setInputText(value);
  }

  return (
    <div className="mainContainer">
      <div className="todoInputContainer">
        <input onChange={verifyTextChange} value={inputText} className="todoInput" />
        <button onClick={handleAdd} className="button">+</button>
      </div>
      <div className="spacer" />
      <TodoList todos={todos} dispatch={dispatch} />
      <div className="infoContainer">
        uncompleted: {todos.filter(todo => !todo.completed).length}
        <span>
          <button onClick={() => {dispatch({ type: ACTIONS.CLEAR_COMPLETED })}} className="button">tidy up</button>
          <button onClick={() => {dispatch({ type: ACTIONS.CLEAR_TODOS })}} className="button">clear</button>
        </span>
      </div>
    </div>
  );
}

export default App;
