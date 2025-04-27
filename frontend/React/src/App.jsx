import { useState } from 'react'
import Todo from './components/Todo';
import CreateTodo from './components/CreateTodo';
import { Toaster } from 'react-hot-toast';

function App() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-2xl p-5 min-w-3/4 shadow-2xl h-3/4 flex flex-col justify-center items-center">
        <div className="mb-4 flex items-center justify-center space-x-4 w-full">
          <label>
            Pokaż:
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="ml-2 border rounded p-1"
            >
              <option value="all">Wszystkie</option>
              <option value="done">Zrobione</option>
              <option value="not_done">Niezrobione</option>
            </select>
          </label>
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
          <Todo filter={filter} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App
