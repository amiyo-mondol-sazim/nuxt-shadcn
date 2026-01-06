<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { createTodoSchema } from "~~/shared/types/todos";
import { toast } from "vue-sonner";

const emit = defineEmits(["created"]);

const form = useForm({
    validationSchema: toTypedSchema(createTodoSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
    try {
        const { data } = await $fetch("/api/todos", {
            method: "POST",
            body: values,
        });
        toast.success("Todo created");
        form.resetForm();
        emit("created", data);
    } catch (err) {
        console.error("Failed to create todo:", err);
        toast.error("Failed to create todo");
    }
});
</script>

<template>
    <Card class="mb-6">
        <CardHeader>
            <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
            <form class="space-y-4" @submit.prevent="onSubmit">
                <FormField v-slot="{ componentField }" name="title">
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="What needs to be done?"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Details (optional)"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <Button type="submit">Add Todo</Button>
            </form>
        </CardContent>
    </Card>
</template>
