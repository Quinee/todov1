import {test,expect} from '@playwright/test'
import { createTodo, deleteTodo, getTodoAll, putTodo, getTodo } from "../util/todo"

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

    test('Getting existing todo should work',async ({request},testInfo)=>{
        const id=testInfo['id']
        const status=await getTodo(request,id)
        expect(status).toBe(200)
    })

    test.afterEach(async({request}, testInfo)=>{
       
        const id=testInfo['id']
        const status=await deleteTodo(request,id)
        expect(status).toBe(200)
    })
})

test('Getting non-existing todo should give 404',async ({request},testInfo)=>{
    const id=0
    const status=await getTodo(request,id)
    expect(status).toBe(404)
})
type TodoResponseBody={
    id:number,
    title:string,
    status:string, 
    createdAt:string,
    updatedAt:string
}

test.describe('When todo is created',()=>{

    test.beforeEach(async ({request},testInfo)=>{
        var bodies:TodoResponseBody[]=[]
       
        for(let i=0;i<=1;i++)  {
        const {status, body} = await createTodo(request,{
          title:`SedinTech_Quinee_${i}`
        })
        expect(status).toBe(201)
        expect(body.id).not.toBe(null)
        expect(body.title).toBe(`SedinTech_Quinee_${i}`)
        bodies.push(body)
       } 
       testInfo['todos']=bodies
     
      }
      )

    test('Getting All Todo should give list of all todos created recently',async ({request},testInfo)=>{
       
        const createdTodos:TodoResponseBody[] = testInfo['todos']
        const {status,body} = await getTodoAll(request)
        expect(status).toBe(200)

        for(const createdTodo of createdTodos){
            const foundTodo = body.find(returnedTodo=>returnedTodo.id==createdTodo.id)
            expect(foundTodo?.id).toBe(createdTodo.id)
            expect(foundTodo?.title).toBe(createdTodo.title)
    }})

    test.afterEach(async({request}, testInfo)=>{
        const createdToDos:TodoResponseBody[]=testInfo['todos']
        for(const createdToDo of createdToDos)
        {
            const status=await deleteTodo(request,createdToDo.id)
            expect(status).toBe(200)
        }
       
        
        
    })
})