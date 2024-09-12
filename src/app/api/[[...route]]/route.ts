import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";
import images from "./images";
import projects from "./projects";
import subscriptions from "./subscriptions";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");

const routes = app
  .route("/users", users)
  .route("/images", images)
  .route("/projects", projects)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
