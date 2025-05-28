<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { CirclePlus } from "lucide-svelte";
  import type { Todo } from "$lib/types/todo";

  const dispatch = createEventDispatcher<{ add: Todo }>();
  let newTask = "";

  async function add() {
    if (!newTask.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    if (res.ok) {
      const todo: Todo = await res.json();
      dispatch("add", todo);
      newTask = "";
    }
  }
</script>

<form on:submit|preventDefault={add} class="flex space-x-2 w-3/4 relative">
  <input
    bind:value={newTask}
    placeholder="Nowe zadanie"
    class="border-2 rounded-lg p-2 w-full pr-9"
  />
  <button type="submit" class="absolute top-1/2 -translate-y-1/2 right-4">
    <CirclePlus class="text-green-600 size-6 cursor-pointer" />
  </button>
</form>
