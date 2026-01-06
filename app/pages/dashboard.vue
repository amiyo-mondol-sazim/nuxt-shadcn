<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

useHead({
    title: "Dashboard",
});

const { user } = useUser();
</script>

<template>
    <div class="container py-10">
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p v-if="user" class="text-muted-foreground">
                    Welcome back, {{ user.username }}! Here are your tasks.
                </p>
            </div>
        </div>

        <DashboardTodoList />
    </div>
</template>
