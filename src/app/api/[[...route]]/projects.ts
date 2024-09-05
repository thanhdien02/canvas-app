import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { auth } from "@/auth";
import { desc, eq } from "drizzle-orm";
const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const session = await auth();
      const { page, limit } = c.req.valid("query");
      if (!session) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      // const query = await db
      //   .select()
      //   .from(projects)
      //   .where(eq(projects.userId, session.user?.id || ""));
      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, session.user?.id || ""))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updateAt));

      if (!data[0]) {
        return c.json({ error: "Not found" }, 400);
      }
      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        width: z.number(),
        height: z.number(),
        json: z.string(),
      })
    ),
    async (c) => {
      const session = await auth();
      if (!session) {
        return c.json({ error: "Unauthorized" });
      }
      const { name, height, width, json } = c.req.valid("json");
      const data = await db
        .insert(projects)
        .values({
          name,
          height,
          width,
          json,
          userId: session.user?.id || "",
          createAt: new Date(),
          updateAt: new Date(),
        })
        .returning();
      if (!data[0]) {
        return c.json({ error: "Something went wrong" }, 400);
      }
      return c.json({ data: data[0] }, 200);
    }
  );

export default app;
