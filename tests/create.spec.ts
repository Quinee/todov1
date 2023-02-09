import { test, expect } from "@playwright/test";
import { createTodo, deleteTodo } from "../util/todo";

test("Creation of todo should work without passing status field", async ({request},testInfo) => {
  const {status, body} = await createTodo(request,{
    title:'Bring Milk'
  })
  expect(status).toBe(201)
  expect(body.id).not.toBe(null)
  expect(body.title).toBe('Bring Milk')
  testInfo['id'] = body.id
});
test.afterEach(async ({request},testInfo)=>{
  const id = testInfo['id']
  const status = await deleteTodo(request,id)
  expect(status).toBe(200)
})
