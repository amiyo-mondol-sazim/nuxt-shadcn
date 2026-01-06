<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    todo: Todo;
}>();

const emit = defineEmits(["updated", "deleted"]);

const statusConfig = {
    pending: { label: "Pending", class: "text-muted-foreground bg-muted" },
    in_progress: {
        label: "In Progress",
        class: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    },
    on_hold: {
        label: "On Hold",
        class: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    done: {
        label: "Done",
        class: "text-slate-500 bg-slate-100 line-through dark:bg-slate-800 dark:text-slate-500",
    },
};

const updateStatus = async (
    newStatus: "pending" | "in_progress" | "on_hold" | "done"
) => {
    if (newStatus === props.todo.status) return;

    try {
        await $fetch(`/api/todos/${props.todo.id}`, {
            method: "PATCH",
            body: { status: newStatus },
        });
        emit("updated");
    } catch (err) {
        console.error("Failed to update todo:", err);
    }
};

const deleteTodo = async () => {
    try {
        await $fetch(`/api/todos/${props.todo.id}`, {
            method: "DELETE",
        });
        emit("deleted");
    } catch (err) {
        console.error("Failed to delete todo:", err);
    }
};
</script>

<template>
    <div
        class="flex items-center justify-between p-4 border rounded-lg mb-2 bg-card text-card-foreground shadow-sm group hover:shadow-md transition-all"
    >
        <div class="flex items-center gap-4 flex-1">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <h4
                        :class="
                            cn(
                                'font-medium truncate transition-all',
                                todo.status === 'done' &&
                                    'text-muted-foreground line-through'
                            )
                        "
                    >
                        {{ todo.title }}
                    </h4>

                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Badge
                                variant="secondary"
                                :class="
                                    cn(
                                        'cursor-pointer hover:opacity-80 transition-colors text-xs px-3 py-1 flex items-center gap-1',
                                        statusConfig[todo.status]?.class
                                    )
                                "
                            >
                                {{
                                    statusConfig[todo.status]?.label ||
                                    todo.status
                                }}
                                <Icon
                                    icon="radix-icons:chevron-down"
                                    class="h-3 w-3 opacity-50"
                                />
                            </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem @click="updateStatus('pending')">
                                <Icon
                                    icon="radix-icons:circle"
                                    class="mr-2 h-4 w-4"
                                />
                                Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                @click="updateStatus('in_progress')"
                            >
                                <Icon
                                    icon="radix-icons:play"
                                    class="mr-2 h-4 w-4 text-blue-500"
                                />
                                In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="updateStatus('on_hold')">
                                <Icon
                                    icon="radix-icons:pause"
                                    class="mr-2 h-4 w-4 text-yellow-500"
                                />
                                On Hold
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="updateStatus('done')">
                                <Icon
                                    icon="radix-icons:check-circled"
                                    class="mr-2 h-4 w-4 text-green-500"
                                />
                                Done
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <p
                    v-if="todo.description"
                    :class="
                        cn(
                            'text-sm text-muted-foreground wrap-break-words',
                            todo.status === 'done' && 'line-through opacity-70'
                        )
                    "
                >
                    {{ todo.description }}
                </p>
            </div>
        </div>

        <Button
            variant="ghost"
            size="icon"
            class="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
            @click="deleteTodo"
        >
            <Icon icon="radix-icons:trash" class="h-4 w-4 text-destructive" />
        </Button>
    </div>
</template>
