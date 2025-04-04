import { useState, useEffect } from 'react'
import Todo from './components/Todo';
import CreateTodo from './components/CreateTodo';

function App() {

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-2xl p-5 min-w-3/4 shadow-2xl h-3/4 flex flex-col justify-center items-center">
        <div className="w-full flex justify-center mb-5">
          <CreateTodo />
        </div>
        <div className="grid grid-cols-3 font-bold text-xl text-center border-b-2 p-2 flex-shrink-0 w-full">
          <div>
            Zadanie
          </div>
          <div>
            Zrobione?
          </div>
        </div>
        <div className="flex-grow overflow-y-auto w-full">
          <Todo />
        </div>
      </div>
    </div>
  )
}

export default App
