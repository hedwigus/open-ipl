import assert from "node:assert/strict";
import { test } from "node:test";
import type { AddressInfo } from "node:net";
import { createApp } from "./app.js";

test("health endpoint reports the Open IPL API version", async () => {
  const server = createApp().listen(0);
  const address = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/v1/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      status: "ok",
      service: "open-ipl-api",
      version: "1.0.0",
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
