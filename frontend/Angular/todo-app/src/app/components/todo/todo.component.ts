import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes, faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule ,FormsModule, FontAwesomeModule],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;
  tasks: Task[] = [];
  newTaskText: string = '';
  editingTodoText: { [key: string]: string } = {}; 

  filter: 'all' | 'done' | 'notDone' = 'all';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  get filteredTasks(): Task[] {
    switch (this.filter) {
      case 'done':
        return this.tasks.filter(t => t.done);
      case 'notDone':
        return this.tasks.filter(t => !t.done);
      default:
        return this.tasks;
    }
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    }, error => {
      console.error('Błąd pobierania zadań:', error);
    });
  }

  addTask(): void {
    if (!this.newTaskText.trim()) return;

    const newTask: Task = {
      task: this.newTaskText,
      done: false
    };

    this.taskService.createTask(newTask).subscribe({
      next: createdTask => {
        this.tasks.push(createdTask);
        this.newTaskText = '';
      },
      error: err => console.error('Błąd dodawania:', err),
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== id);
        delete this.editingTodoText[id];
      },
      error: (err) => console.error('Błąd usuwania zadania:', err)
    });
  }

  updateTask(task: Task): void {
    const updatedTask = { ...task, done: !task.done };
    if (task._id) {
      this.taskService.updateTask(task._id, updatedTask).subscribe(updated => {
        const idx = this.tasks.findIndex(t => t._id === task._id);
        if (idx !== -1) {
          this.tasks[idx] = { ...updated[idx], isEditing: false };
        }
        this.editingTodoText[task._id!] = '';
      }, error => {
        console.error('Błąd aktualizacji zadania:', error);
      });
    }
  }

  editTask(task: Task): void {
    this.editingTodoText[task._id!] = task.task;
    task.isEditing = true;
  }

  saveTask(task: Task): void {
    if (!this.editingTodoText[task._id!].trim()) {
      this.deleteTask(task._id!);
      return;
    }

    const updatedTask = { ...task, task: this.editingTodoText[task._id!], isEditing: false };
    if (task._id) {
      this.taskService.updateTask(task._id, updatedTask).subscribe(updated => {
        const idx = this.tasks.findIndex(t => t._id === task._id);
        if (idx !== -1) {
          this.tasks[idx] = { ...updated[idx], isEditing: false };
        }
        this.editingTodoText[task._id!] = '';
      }, error => {
        console.error('Błąd aktualizacji zadania:', error);
      });
    }
  }

  cancelEdit(task: Task): void {
    task.isEditing = false;
    this.editingTodoText[task._id!] = '';
    if (!task.task.trim()) {
      this.deleteTask(task._id!);
    }
  }

  onEditingTextChange(taskId: string, newText: string): void {
    this.editingTodoText[taskId] = newText;
  }
}
