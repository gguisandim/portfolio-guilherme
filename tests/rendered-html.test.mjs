import assert from "node:assert/strict";
import test from "node:test";

test("renders the portfolio title and primary content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /Guilherme Sandim — Web, Dados e IA/i);
  assert.match(html, /Pipinho Financial/i);
  assert.match(html, /WEB ARCADE/i);
  assert.match(html, /DATA FESTIVAL/i);
  assert.match(html, /AI CORE/i);
});
