import { and, eq } from "drizzle-orm";
import { todosTable } from "~~/server/db/schema";
import db from "~~/server/lib/db";
import { updateTodoSchema } from "~~/shared/types/todos";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }

    const id = getRouterParam(event, "id");
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing todo ID",
        });
    }

    const body = await readBody(event);
    const result = updateTodoSchema.safeParse(body);

    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input",
            data: result.error.errors,
        });
    }

    const [updatedTodo] = await db
        .update(todosTable)
        .set({
            ...result.data,
            updatedAt: new Date(),
        })
        .where(
            and(eq(todosTable.id, Number(id)), eq(todosTable.userId, user.id))
        )
        .returning();

    if (!updatedTodo) {
        throw createError({
            statusCode: 404,
            statusMessage: "Todo not found",
        });
    }

    return {
        data: updatedTodo,
        message: "Todo updated successfully",
    };
});
