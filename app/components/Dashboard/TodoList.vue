<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import TodoForm from "./TodoForm.vue";
import type { Todo } from "~~/shared/types/todos";
import type { Response } from "~~/shared/types/response";

const { data: todosWrapper, refresh } =
    await useFetch<Response<Todo[]>>("/api/todos");
const todos = computed(() => todosWrapper.value?.data || []);

const handleCreated = () => {
    refresh();
};

const handleUpdated = () => {
    refresh();
};

const handleDeleted = () => {
    refresh();
};
</script>

<template>
    <div class="max-w-3xl mx-auto">
        <TodoForm @created="handleCreated" />

        <div class="space-y-4">
            <h3 class="text-xl font-semibold tracking-tight">Your Tasks</h3>
            <div
                v-if="todos.length === 0"
                class="text-center py-10 text-muted-foreground"
            >
                <p>No todos yet. Create one above!</p>
            </div>

            <TransitionGroup name="list" tag="div">
                <TodoItem
                    v-for="todo in todos"
                    :key="todo.id"
                    :todo="todo"
                    @updated="handleUpdated"
                    @deleted="handleDeleted"
                />
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
