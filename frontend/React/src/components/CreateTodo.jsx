import React from 'react'
import { useTodoStore } from '../store/useTodoStore'
import { PlusCircle } from 'lucide-react';

const CreateTodo = () => {
  const { createTask } = useTodoStore();

  return (
    <div className="w-3/4">
      <form className="flex flex-col gap-2" onSubmit={(e) => {
        e.preventDefault();
        const task = e.target.task.value;
        const done = false;
        createTask(task, done);
        e.target.reset();
      }}>
        <div className="relative">
          <input type="text" name="task" placeholder="Nowe zadanie" className="border-2 rounded-lg p-2 w-full pr-9" required />
          <button type="submit" className="text-green-600 rounded-lg p-1 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"><PlusCircle className="size-6"/></button>
        </div>
      </form>
    </div>
  )
}

export default CreateTodo
