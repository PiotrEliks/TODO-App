import type { PageServerLoad } from './$types';

export const load: PageServerLoad  = async ({ fetch }) => {
  let loading: boolean;
  type Todo = { _id: string; task: string; done: boolean, isEditing: boolean };

  let todos: Todo[] = [];
  loading = true;
  todos = await fetch("/api/todos").then((r: any) => r.json());
  todos = todos.map((todo: Todo) => ({
    ...todo,
    isEditing: false 
  }));
  loading = false;

  return {
    todos,
    loading
  }
};