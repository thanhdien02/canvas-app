import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";
import images from "./images";
import projects from "./projects";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");

const routes = app
  .route("/users", users)
  .route("/images", images)
  .route("/projects", projects);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
