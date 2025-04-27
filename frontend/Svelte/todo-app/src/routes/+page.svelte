<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import CreateTodo from "$lib/components/CreateTodo.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import type { Todo } from "$lib/types/todo";
  export let data;

  let todos: Todo[] = data.todos;

  let filter: "all" | "done" | "not_done" = "all";

  function onAdd(e: CustomEvent<Todo>) {
    todos = [...todos, e.detail];
  }
  function onUpdate(e: CustomEvent<Todo>) {
    todos = todos.map((t) => (t._id === e.detail._id ? e.detail : t));
  }
  function onDelete(e: CustomEvent<string>) {
    todos = todos.filter((t) => t._id !== e.detail);
  }

  async function fetchTodos(status: typeof filter) {
    const res = await fetch(`/api/todos?status=${status}`);
    todos = await res.json();
  }

  onMount(() => {
    fetchTodos(filter);
  });

  $: if (browser) {
    fetchTodos(filter);
  }
</script>

<main
  class="bg-gradient-to-r from-violet-600 to-indigo-600 h-screen w-full flex justify-center items-center"
>
  <div
    class="bg-white rounded-2xl p-5 min-w-3/4 shadow-2xl h-3/4 flex flex-col justify-center items-center"
  >
    <div class="mb-4 flex items-center space-x-4 w-3/4">
      <label>
        Pokaż:
        <select bind:value={filter} class="ml-2 border rounded p-1">
          <option value="all">Wszystkie</option>
          <option value="done">Zrobione</option>
          <option value="not_done">Niezrobione</option>
        </select>
      </label>
      <CreateTodo on:add={onAdd} />
    </div>

    <div class="flex-grow overflow-y-auto w-full">
      <TodoList {todos} on:update={onUpdate} on:delete={onDelete} />
    </div>
  </div>
</main>
