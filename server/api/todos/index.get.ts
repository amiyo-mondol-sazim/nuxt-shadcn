import { desc, eq } from "drizzle-orm";
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

    const todos = await db
        .select()
        .from(todosTable)
        .where(eq(todosTable.userId, user.id))
        .orderBy(desc(todosTable.createdAt));

    return {
        data: todos,
        message: "Todos fetched successfully",
    };
});
