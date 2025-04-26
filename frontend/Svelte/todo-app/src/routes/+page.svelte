<script lang="ts">
  import TodoList from "$lib/components/TodoList.svelte";
  import { CirclePlus } from "lucide-svelte";
  type Todo = { _id: string; task: string; done: boolean };
  export let data;
  let { todos } = data;
  let newTask = "";

  async function addTodo() {
    if (!newTask.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    if (res.ok) {
      const todo: Todo = await res.json();
      todos = [...todos, todo];
      newTask = "";
    }
  }

  function onUpdate(event: CustomEvent<Todo>) {
    todos = todos.map((t) => (t._id === event.detail._id ? event.detail : t));
  }

  function onDelete(event: CustomEvent<string>) {
    todos = todos.filter((t) => t._id !== event.detail);
  }
</script>

<main
  class="bg-gradient-to-r from-violet-600 to-indigo-600 h-screen w-full flex justify-center items-center"
>
  <div
    class="bg-white rounded-2xl p-5 min-w-3/4 shadow-2xl h-3/4 flex flex-col justify-center items-center"
  >
    <div class="w-full flex justify-center mb-5">
      <form
        on:submit|preventDefault={addTodo}
        class="flex space-x-2 mb-4 w-3/4 relative"
      >
        <input
          bind:value={newTask}
          placeholder="Nowe zadanie"
          class="border-2 rounded-lg p-2 w-full pr-9"
        />
        <button type="submit" class="absolute top-1/2 -translate-y-1/2 right-4">
          <CirclePlus class="text-green-600 size-6 cursor-pointer" />
        </button>
      </form>
    </div>

    <div class="flex-grow overflow-y-auto w-full">
      <TodoList {todos} on:update={onUpdate} on:delete={onDelete} />
    </div>
  </div>
</main>

<style>
</style>
