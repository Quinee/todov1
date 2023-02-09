import { APIRequestContext } from "@playwright/test";

export async function createTodo(request:APIRequestContext,body:{title:string,status?:string}){
    const resp = await request.post('http://144.24.105.148:8080/v1/todo',{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json() }
}