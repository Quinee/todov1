import { APIRequestContext } from "@playwright/test";
import { BASE_URL } from "../config";

export async function createTodo(request:APIRequestContext,body:{title?:string,status?:string}){
    const resp = await request.post(`${BASE_URL}/v1/todo`,{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json() }
}
export async function deleteTodo(request:APIRequestContext,id:number){
  const resp = await request.delete(`${BASE_URL}/v1/todo/${id}`)
  return resp.status()
}

export async function patchTodo(request:APIRequestContext,body:{title?:string,status?:string},id:number)
{
  const resp = await request.patch(`${BASE_URL}/v1/todo/${id}`,{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json()}
}

export async function putTodo(request:APIRequestContext,body:{title?:string,status?:string},id:number)
{
  const resp=await request.put(`${BASE_URL}/v1/todo/${id}`,{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json()}
}

export async function getTodo(request:APIRequestContext,id:number){
  const resp = await request.get(`${BASE_URL}/v1/todo/${id}`)
  return {status:resp.status(), body: await resp.json()}
}

export async function getTodoAll(request:APIRequestContext){
  const resp = await request.get(`${BASE_URL}/v1/todo`)
  return {status:resp.status(), body: await resp.json()}
}