import { and, eq } from "drizzle-orm";
import { todosTable } from "~~/server/db/schema";
import db from "~~/server/lib/db";

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

    const [deletedTodo] = await db
        .delete(todosTable)
        .where(
            and(eq(todosTable.id, Number(id)), eq(todosTable.userId, user.id))
        )
        .returning();

    if (!deletedTodo) {
        throw createError({
            statusCode: 404,
            statusMessage: "Todo not found",
        });
    }

    return {
        message: "Todo deleted successfully",
    };
});
