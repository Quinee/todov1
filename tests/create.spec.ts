import { test, expect } from "@playwright/test";
import { createTodo } from "../util/todo";

test("Creation of todo should work without passing status field", async ({request}) => {
  const {status, body} = await createTodo(request,{
    title:'Bring Milk'
  })
  expect(status).toBe(201)
  expect(body.id).not.toBe(null)
  expect(body.title).toBe('Bring Milk')
});
