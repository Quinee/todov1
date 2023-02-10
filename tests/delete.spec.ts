import {test,expect} from '@playwright/test'
import { createTodo, deleteTodo, patchTodo, putTodo, getTodo } from "../util/todo"


test.describe('When todo is created',()=>{

    test.beforeEach(async ({request},testInfo)=>{
          
        const {status, body} = await createTodo(request,{
          title:'SedinTech_Quinee'
        })
        expect(status).toBe(201)
        expect(body.id).not.toBe(null)
        expect(body.title).toBe('SedinTech_Quinee')
        testInfo['id'] = body.id
      })

    test('Deletion of todo should work if todo exists',async ({request},testInfo)=>{
        const id=testInfo['id']
        const status=await deleteTodo(request,id)
        expect(status).toBe(200)
    })
})

test('Deletion of non existing todo should give 404 via put endpoint',async ({request},testInfo)=>{
    const id=0
    const status=await deleteTodo(request,id)
    expect(status).toBe(404)
})