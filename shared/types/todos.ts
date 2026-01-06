import type { InferSelectModel } from "drizzle-orm";
import z from "zod";
import type { todosTable } from "~~/server/db/schema";
import { statusEnum } from "~~/server/db/schema";

export const updateTodoSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(statusEnum.enumValues).optional(),
});

export type UpdateTodoSchemaType = z.infer<typeof updateTodoSchema>;

export const createTodoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().default(""),
});

export type CreateTodoSchemaType = z.infer<typeof createTodoSchema>;

export type Todo = InferSelectModel<typeof todosTable>;
