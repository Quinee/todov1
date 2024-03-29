
import test, { expect } from "@playwright/test";
import { createTodo, deleteTodo, putTodo } from "../util/todo";

test.describe("Positive test cases", () => {
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

test.describe("Negative test cases", () => {
  test("Deletion of non existing todo should give 404 via delete endpoint", async ({
    request,
  }) => {
    const id=0
    const status=await deleteTodo(request,id)
    expect(status).toBe(404)
  });
});

