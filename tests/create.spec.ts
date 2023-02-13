import { test, expect } from "@playwright/test";
import { createTodo, deleteTodo } from "../util/todo";

test.describe.skip("Negative category", () => {
  test("Creation of todo should work without passing status field", async ({
    request,
  }, testInfo) => {
    const { status, body } = await createTodo(request, {
      title: "Bring Milk",
    });
    expect(status).toBe(201);
    expect(body.id).not.toBe(null);
    expect(body.title).toBe("Bring Milk");
    testInfo["id"] = body.id;
  });

  test("Creation of todo should work when passed status field", async ({
    request,
  }, testInfo) => {
    const title = "Buy shares";
    const { status, body } = await createTodo(request, {
      title: title,
      status: "ACTIVE",
    });
    expect(status).toBe(201);
    expect(body.id).not.toBe(null);
    expect(body.title).toBe(title);
    testInfo["id"] = body.id;
  });

  test.afterEach(async ({ request }, testInfo) => {
    const id = testInfo["id"];
    const status = await deleteTodo(request, id);
    expect(status).toBe(200);
  });
});

test.describe("Negative category", () => {
  test("Creation of Todo should give 400 when title field is not passed", async ({
    request,
  }) => {
    const { status } = await createTodo(request, {});
    expect(status).toBe(400);
  });

  test("Creation of todo should give 400 when status value is not eaither ACTIVE or DONE", async ({
    request,
  }) => {
    const { status } = await createTodo(request, {
      status: "DONE",
    });
    expect(status).toBe(400);
  });
});
