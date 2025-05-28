<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Trash2, Check, X, Pencil } from "lucide-svelte";
  import type { Todo } from "$lib/types/todo";

  export let todos: Todo[] = [];
  const dispatch = createEventDispatcher<{
    delete: string;
    update: Todo;
  }>();

  let editingTodoText: { [key: string]: string } = {};

  async function deleteTodo(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    dispatch("delete", id);
  }

  async function toggleDone(todo: Todo) {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done, task: todo.task }),
    });
    if (res.ok) {
      dispatch("update", { ...todo, done: !todo.done });
    }
  }

  async function saveTask(todo: Todo, newTaskText: string) {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTaskText, done: todo.done }),
    });

    if (res.ok) {
      dispatch("update", { ...todo, task: newTaskText, isEditing: false });
    }
  }

  function cancelEdit(todo: Todo) {
    dispatch("update", { ...todo, isEditing: false });
  }

  function toggleEdit(todo: Todo) {
      console.log("Toggling edit for todo:", todo);
      editingTodoText[todo._id] = todo.task;
      dispatch("update", { ...todo, isEditing: true });
    }

  const handleSave = (todo: Todo, newTaskText: string) => {
    if (!newTaskText.trim()) {
      deleteTodo(todo._id);
    } else {
      saveTask(todo, newTaskText);
    }
  };
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
          <div class="todo-text flex items-center gap-1 justify-self-start">
            {#if todo.isEditing}
              <input
                type="text"
                bind:value={editingTodoText[todo._id]}
                defaultValue={editingTodoText[todo._id] || todo.task}
                class="p-2 border border-gray-300 rounded-md w-full"
                on:change={(e:any) => editingTodoText[todo._id] = e.target.value}
              />
            {:else}
              <span class={`flex-1 ${todo.done ? 'line-through text-gray-500' : ''}`} >
                {todo.task}
              </span>
            {/if}
            <div class="todo-icons flex gap-0.5">
              {#if todo.isEditing}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <span on:click={() => handleSave(todo, editingTodoText[todo._id])} >
                <Check class="cursor-pointer text-green-500" />
              </span>
                  /
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <span on:click={() => cancelEdit(todo)}>
                  <X class="cursor-pointer text-red-500" />
                </span>
              {:else}
                {#if !todo.done}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <span on:click={() => toggleEdit(todo)}>
                    <Pencil class="cursor-pointer text-blue-500 size-4" />
                  </span>
                {/if}
              {/if}
            </div>
          </div>
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="flex justify-center">
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
  .done {
    text-decoration: line-through;
    opacity: 0.6;
  }
</style>
