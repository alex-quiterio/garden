import { cp, mkdir, rm } from "node:fs/promises";
import { composePage } from "@application/composePage";
import { alexProfileSource } from "@infrastructure/content/alexProfile";
import { renderPage } from "@infrastructure/html/renderPage";

const root = `${import.meta.dir}/../../..`;
const dist = `${root}/dist`;

export async function build(): Promise<void> {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  const page = composePage(alexProfileSource);
  const html = renderPage(page, { timeZone: page.profile.timeZone });
  await Bun.write(`${dist}/index.html`, html);

  await cp(`${import.meta.dir}/styles`, `${dist}/styles`, { recursive: true });

  const result = await Bun.build({
    entrypoints: [`${import.meta.dir}/client/main.ts`],
    outdir: dist,
    target: "browser",
    minify: true,
  });
  if (!result.success) {
    for (const log of result.logs) console.error(log);
    throw new Error("client bundle failed");
  }
}

if (import.meta.main) {
  await build();
  console.log("built → dist/");
}
