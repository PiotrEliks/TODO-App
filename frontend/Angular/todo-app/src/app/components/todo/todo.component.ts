import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule ,FormsModule, LucideAngularModule, FontAwesomeModule],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  faCheck = faCheck;
  readonly FileIcon = FileIcon;
  tasks: Task[] = [];
  newTaskText: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
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

    this.taskService.createTask(newTask).subscribe(tasks => {
      this.tasks = tasks;
      this.newTaskText = '';
    }, error => {
      console.error('Błąd dodawania zadania:', error);
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(tasks => {
      this.tasks = tasks;
    }, error => {
      console.error('Błąd usuwania zadania:', error);
    });
  }

  toggleTask(task: Task): void {
    const updatedTask = { ...task, done: !task.done };
    if (task._id) {
      this.taskService.updateTask(task._id, updatedTask).subscribe(tasks => {
        this.tasks = tasks;
      }, error => {
        console.error('Błąd aktualizacji zadania:', error);
      });
    }
  }
}
