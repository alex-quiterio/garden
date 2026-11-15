import { build } from "@apps/web/build";

const dist = `${import.meta.dir}/../../../dist`;

await build();

const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const rel = path === "/" ? "/index.html" : path;
    if (rel.includes("..")) return new Response("bad request", { status: 400 });
    const file = Bun.file(`${dist}${rel}`);
    return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
  },
});

console.log(`garden → http://localhost:${server.port}`);
