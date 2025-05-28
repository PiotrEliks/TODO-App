import { useEffect, useState } from 'react'
import { useTodoStore } from '../store/useTodoStore'
import { Loader2, Trash2, Check, X, Pencil } from 'lucide-react'

function Todo({ filter }) {
  const { tasks, getAllTasks, toggleEdit, saveTask, cancelEdit, deleteTask, areTasksLoading, updateTask } = useTodoStore();
  const [editingTodoText, setEditingTodoText] = useState({});

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  const handleEdit = (taskId) => {
    toggleEdit(taskId);
  };

  const handleSave = (taskId, newTaskText) => {
    if (!newTaskText.trim()) {
      deleteTask(taskId);
    } else {
      saveTask(taskId, newTaskText);
    }
  };

  const handleCancel = (taskId) => {
    cancelEdit(taskId);
  };

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
            <div className="todo-text flex items-center gap-1 justify-self-start">
              {task.isEditing ? (
                <input
                  type="text"
                  defaultValue={editingTodoText[task._id] || task.task}
                  onChange={(e) => setEditingTodoText(prev => ({ ...prev, [task._id]: e.target.value }))}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className={`flex-1 ${task.done ? 'line-through text-gray-500' : ''}`}>{task.task}</span>
              )}
              <div className="todo-icons flex gap-0.5">
                {task.isEditing? (
                  <>
                    <Check onClick={() => handleSave(task._id, editingTodoText[task._id])} className="cursor-pointer text-green-500" />
                    /
                    <X onClick={() => handleCancel(task._id)} className="cursor-pointer text-red-500" />
                  </>
                ) : (
                  !task.done && <Pencil onClick={() => handleEdit(task._id)} className="cursor-pointer text-blue-500 size-4" />
                )}
              </div>
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
