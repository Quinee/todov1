import test, { expect } from "@playwright/test";
import { createTodo, deleteTodo, putTodo } from "../util/todo";

test.describe.skip("Positive category", () => {
  test.beforeEach(async ({ request }, testInfo) => {
    const { status, body } = await createTodo(request, {
      title: "Buy Apple shares",
    });
    expect(status).toBe(201);
    expect(body.id).not.toBe(null);
    testInfo["id"] = body.id;
  });

  test("Deletion of todo should work if todo exists", async ({
    request,
  }, testInfo) => {
    const status = await deleteTodo(request, testInfo["id"]);
    expect(status).toBe(200);
  });
});

test.describe("Negative category", () => {
  test("Deletion of non existing todo should give 404 via put endpoint", async ({
    request,
  }) => {
    const { status } = await putTodo(request, {}, 22);
    expect(status).toBe(400);
  });
});
