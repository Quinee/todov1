import { APIRequestContext } from "@playwright/test";

export async function createTodo(request:APIRequestContext,body:{title?:string,status?:string}){
    const resp = await request.post('http://144.24.105.148:8080/v1/todo',{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json() }
}
export async function deleteTodo(request:APIRequestContext,id:number){
  const resp = await request.delete(`http://144.24.105.148:8080/v1/todo/${id}`)
  return resp.status()
}

export async function patchTodo(request:APIRequestContext,body:{title?:string,status?:string},id:number)
{
  const resp = await request.patch(`http://144.24.105.148:8080/v1/todo/${id}`,{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json()}
}

export async function putTodo(request:APIRequestContext,body:{title?:string,status?:string},id:number)
{
  const resp=await request.put(`http://144.24.105.148:8080/v1/todo/${id}`,{
    data:body,
    headers:{
      'Content-Type':'application/json'
    }
    
  })
  return {status:resp.status(), body: await resp.json()}
}

export async function getTodo(request:APIRequestContext,id:number){
  const resp = await request.get(`http://144.24.105.148:8080/v1/todo/${id}`)
  return {status:resp.status(), body: await resp.json()}
}

export async function getTodoAll(request:APIRequestContext){
  const resp = await request.get(`http://144.24.105.148:8080/v1/todo`)
  return {status:resp.status(), body: await resp.json()}
}