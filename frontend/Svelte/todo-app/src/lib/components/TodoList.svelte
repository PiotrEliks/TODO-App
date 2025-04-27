<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Trash2, Check, X } from "lucide-svelte";
  import type { Todo } from "$lib/types/todo";

  export let todos: Todo[] = [];
  const dispatch = createEventDispatcher<{
    delete: string;
    update: Todo;
  }>();

  async function deleteTodo(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    dispatch("delete", id);
  }

  async function toggleDone(todo: Todo) {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    if (res.ok) {
      dispatch("update", { ...todo, done: !todo.done });
    }
  }
</script>

<div class="flex-grow overflow-y-auto w-full">
  {#if todos.length === 0}
    <p class="p-4 text-center">No todos yet.</p>
  {:else}
    <div class="flex-grow overflow-y-auto w-full">
      <div
        class="grid grid-cols-3 font-bold text-xl text-center border-b-2 p-2 w-full"
      >
        <div>Zadanie</div>
        <div>Zrobione?</div>
        <div></div>
      </div>

      {#each todos as todo}
        <div
          class="grid grid-cols-3 gap-10 border-b text-center p-3 items-center"
        >
          <div class={todo.done ? "line-through opacity-60" : ""}>
            {todo.task}
          </div>
          <div class="flex justify-center">
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <span class="cursor-pointer" on:click={() => toggleDone(todo)}>
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
              class="flex items-center gap-1 bg-red-700 hover:bg-red-700/70 text-white rounded-xl px-2 py-1 cursor-pointer"
            >
              <Trash2 class="size-5" /> Usuń
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
</style>
