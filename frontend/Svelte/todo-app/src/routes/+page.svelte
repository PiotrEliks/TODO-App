<script lang="ts">
  import { CirclePlus, X, Trash2, Check } from "lucide-svelte";
  import { onMount } from "svelte";
  type Todo = { _id: string; task: string; done: boolean };

  let todos: Todo[] = [];
  let newTask = "";
  let loading = true;

  async function fetchTodos() {
    loading = true;
    todos = await fetch("/api/todos").then((r) => r.json());
    loading = false;
  }

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

  async function deleteTodo(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    todos = todos.filter((t) => t._id !== id);
  }

  async function toggleDone(todo: Todo) {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    if (res.ok) {
      todos = todos.map((t) =>
        t._id === todo._id ? { ...t, done: !todo.done } : t
      );
    }
  }

  onMount(fetchTodos);
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

    <div
      class="grid grid-cols-3 font-bold text-xl text-center border-b-2 p-2 flex-shrink-0 w-full"
    >
      <div>Zadanie</div>
      <div>Zrobione?</div>
    </div>

    <div class="flex-grow overflow-y-auto w-full">
      {#if loading}
        <p>Loading…</p>
      {:else if todos.length === 0}
        <p>No todos yet.</p>
      {:else}
        <div class="w-full h-full">
          {#each todos as todo}
            <div class="grid grid-cols-3 gap-10 border-b-1 text-center p-3">
              <div class={`${todo.done ? "line-through" : ""}`}>
                {todo.task}
              </div>
              <div class="flex justify-center">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <span
                  class="cursor-pointer"
                  on:click={() => {
                    toggleDone(todo);
                  }}
                >
                  {#if todo.done}
                    <Check class="size-8 text-green-500 hover:scale-150" />
                  {:else}
                    <X class="size-8 text-red-500 hover:scale-150" />
                  {/if}
                </span>
              </div>
              <div class="flex justify-end">
                <button
                  on:click={() => deleteTodo(todo._id)}
                  class="flex flex-row items-center gap-1 cursor-pointer bg-red-700 hover:bg-red-700/70 text-white rounded-xl px-2 py-1"
                >
                  <Trash2 class="size-5" /> Usuń
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
</style>
