import React from 'react'
import "./styles/Todo.css"
import { ACTIONS } from "./App.js"

export default function Todo({ todo, dispatch }) {
    return (
        <label className='todo' id={todo.id}>
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => {dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } }) }}
                className="checkbox" />
            <span className='text'>{todo.text}</span>
        </label>
    )
}
