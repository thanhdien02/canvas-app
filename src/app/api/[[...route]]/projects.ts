import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";
import { auth } from "@/auth";
import { and, desc, eq } from "drizzle-orm";

const app = new Hono()
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const session = await auth();
      const { id } = c.req.valid("param");

      if (!session || !session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, session.user?.id)))
        .returning();

      return c.json({ data: data[0] });
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createAt: true,
          updateAt: true,
        })
        .partial()
    ),
    async (c) => {
      const session = await auth();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      if (!session || !session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db
        .update(projects)
        .set({
          ...values,
          updateAt: new Date(),
        })
        .where(
          and(eq(projects.id, id), eq(projects.userId, session.user?.id || ""))
        )
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Invalid project" }, 400);
      }

      return c.json({ data: data[0] }, 200);
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const session = await auth();
      const { id } = c.req.valid("param");
      if (!session || !session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db.select().from(projects).where(eq(projects.id, id));

      return c.json({ data: data[0] }, 200);
    }
  )
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
      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, session.user?.id || ""))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updateAt));

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
  )
  .post(
    "/:id/duplicate",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const session = await auth();
      if (!session || !session.user?.id) {
        return c.json({ error: "Unauthorized" });
      }
      const { id } = c.req.valid("param");

      const dataProject = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, session.user?.id)));

      if (dataProject.length === 0) {
        return c.json({ error: " Not found" }, 404);
      }
      const duplicateData = await db
        .insert(projects)
        .values({
          name: "Make copy of project",
          height: dataProject[0].height,
          width: dataProject[0].width,
          json: dataProject[0].json,
          userId: session.user?.id || "",
          createAt: new Date(),
          updateAt: new Date(),
        })
        .returning();

      return c.json({ data: duplicateData[0] }, 200);
    }
  );

export default app;
