import {test,expect} from '@playwright/test'
import { createTodo, deleteTodo, patchTodo, putTodo } from "../util/todo"

test.describe('When todo is created',()=>{
    test.beforeEach(async ({request},testInfo)=>{
          
            const {status, body} = await createTodo(request,{
              title:'SedinTech_Quinee'
            })
            expect(status).toBe(201)
            expect(body.id).not.toBe(null)
            expect(body.title).toBe('SedinTech_Quinee')
            //ID = body.id
            testInfo['id'] = body.id
          
        
    })
    test('Updating only title of todo via patch endpoint should work',async ({request},testInfo)=>{
       
        const id = testInfo['id']
        const {status,body}=await patchTodo(request,{
            title:'SedinTech_Quinee_Updated'
        },id)
        //console.log(request.bas)
        expect(status).toBe(200)
        expect(body.title).toBe('SedinTech_Quinee_Updated')
    })
    test('Updating only status of todo via patch endpoint should work',async({request},testInfo)=>{
         // get id/body from testinfo
        //use it for patch/put
        const id=testInfo['id']
        const{status,body}=await patchTodo(request,{
            //title:'SedinTech_Quinee_WithStatus',
            status:'ACTIVE'
        },id)
        expect(status).toBe(200)
        expect(body.status).toBe('ACTIVE')
    })
    test('Updation of status todo should give 400 when status is not either of ACTIVE or DONE',async({request},testInfo)=>{
        // get id/body from testinfo
        //use it for patch/put
        const id=testInfo['id']
        const {status,body}=await patchTodo(request,{
            status:'INCOMPLETE'
        },id)
        expect(status).toBe(400)
    })
    test('Updation of both status and title should work via patch endpoint',async ({request},testInfo)=>{
        const id=testInfo['id']
        const {status,body}=await patchTodo(request,{
            title:'SedinTech_Quinee_WithStatus',
            status:'DONE'
        },id)
        expect(status).toBe(200)
    })

    test('Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in patch',async ({request},testInfo)=>{
        const id=testInfo['id']
        const {status,body}=await patchTodo(request,{
            title:'SedinTech_Quinee_WithStatus',
            status:'INCOMPLETE'
        },id)
        expect(status).toBe(400)
    })

    test('Updation of both status and title should work via put endpoint',async ({request},testInfo)=>{
        const id=testInfo['id']
        const {status,body}=await putTodo(request,{
            title:'SedinTech_Quinee_Update',
            status:'DONE'
        },id)
        expect(status).toBe(200)
        expect(body.title).toBe('SedinTech_Quinee_Update')
    }) 


    test('Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in put',async ({request},testInfo)=>{
        const id=testInfo['id']
        const {status,body}=await putTodo(request,{
            title:'SedinTech_Quinee_Update',
            status:'INCOMPLETE'
        },id)
        expect(status).toBe(400)
    })

    test('Updation of only title should give 400 in put',async ({request},testInfo)=>{
        const id=testInfo['id']
        const {status,body}=await putTodo(request,{
            title:'SedinTech_Quinee_Update'
        },id)
        expect(status).toBe(400)
    })

    test('Updation of only status should give 400 in put',async ({request},testInfo)=>{
        const id=testInfo['id']
        const {status,body}=await putTodo(request,{
            
            status:'ACTIVE'
        },id)
        expect(status).toBe(400)
    })


    test.afterEach(async({request}, testInfo)=>{
        // get id/body from testinfo
        // use id to delete todo created here
        const id=testInfo['id']
        const status=await deleteTodo(request,id)
        expect(status).toBe(200)
    })
})