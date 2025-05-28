import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string;
  task: string;
  done: boolean;
  isEditing?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5001/api/task';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/all`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/new`, task);
  }

  updateTask(id: string, task: Task): Observable<Task[]> {
    return this.http.put<Task[]>(`${this.apiUrl}/${id}/update`, task);
  }

  deleteTask(id: string): Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.apiUrl}/${id}/delete`);
  }
}
