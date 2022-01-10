import React, { FC, useEffect, useState } from 'react'

type Props = { }

type Todo = {
  action: string,
  completed: boolean
}

export const App: FC<Props> = () => {
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [input, setInput] = useState<string>("")

  function addTodo (todo: string) {
    let newTodo: Todo = {action: todo, completed: false}
    setTodos([...todos, newTodo])
    setInput("")
    console.log("Todo added", todos); 
  }

  function removeTodo (todo: Todo) {
    setTodos([...todos.filter(el => todo != el)])
  }

  function checkTodo (todo: Todo) {
    let newTodos = todos.map((el)=> {
      if(el == todo) {
        el.completed = true
      }
      return el
    })
    setTodos([...newTodos])
  }

  const handleInput = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') addTodo(input)
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value)
  }

  return (
    <div className="text-center w-1/3 rounded-md bg-blue-100 m-6">
      <h1 className='text-2xl mt-4 underline'>Checklist</h1>
      <div className="w-full  ">
        {
          todos.map((todo, i) => {
            console.log(todo);
            if( todo.completed ) {
              return (
                <div key={i} className="line-through">
                {
                  todo.action
                }
                <span>
                  <button className='p-2' onClick={()=>{checkTodo(todo)}}>✅</button>
                  <button className='p-2' onClick={()=>{removeTodo(todo)}}>❌</button>
                </span>
              </div>
              )
            } else {
              return (
                <div key={i}>
                {
                  todo.action
                }
                <span>
                  <button className='p-2' onClick={()=>{checkTodo(todo)}}>✅</button>
                  <button className='p-2' onClick={()=>{removeTodo(todo)}}>❌</button>
                </span>
              </div>
              )
            }
        })
        }
      </div>
      <div className='bg-gray-50 border rounded-b-md w-full'>
        <input 
        onKeyUp={handleInput} 
        onChange={handleChangeInput}
        value={input}
        type="text" 
        className="mr-2 w-full"/>
        
        <button 
        className=""
        onClick={()=>{addTodo(input)}}>Add a Todo</button>
      </div>
    </div>
  )
}