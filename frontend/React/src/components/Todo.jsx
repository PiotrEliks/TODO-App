import { useState, useEffect } from 'react'
import { useTodoStore } from '../store/useTodoStore'
import { Loader2, Trash2, Check, X } from 'lucide-react'

function Todo({ filter }) {
  const { tasks, areTasksLoading, createTask, deleteTask, getAllTasks, getTaskById, updateTask } = useTodoStore();

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.done
    if (filter === 'not_done') return !task.done
    return true;
  });

  if (areTasksLoading) {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="size-7 animate-spin"/>
        </div>
    )
  }

  return (
    <div className="w-full h-full">
      {filteredTasks.length === 0 ? (
        <p className="p-4 text-center">Brak zadań do wyświetlenia.</p>
      ) : (
        filteredTasks.map(task => (
          <div
            key={task._id}
            className="grid grid-cols-3 gap-10 border-b-1 text-center p-3"
          >
            <div className={task.done ? 'line-through opacity-60' : ''}>
              {task.task}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => updateTask(task._id, !task.done)}
                aria-label={
                  task.done ? 'Oznacz jako niezrobione' : 'Oznacz jako zrobione'
                }
              >
                {task.done ? (
                  <Check className="size-8 text-green-500 hover:scale-150" />
                ) : (
                  <X className="size-8 text-red-500 hover:scale-150" />
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => deleteTask(task._id)}
                type="button"
                className="flex items-center gap-1 bg-red-700 hover:bg-red-700/70 text-white rounded-xl px-2 py-1 cursor-pointer"
              >
                <Trash2 className="size-5" /> Usuń
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Todo
