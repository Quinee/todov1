import {test,expect} from '@playwright/test'
test.describe('When to is created',()=>{
    test.beforeEach(()=>{
        //create todo here
        //store body/id in test info
    })
    test('Updating only title of todo via patch endpoint should work',()=>{
         // get id/body from testinfo
        //use it for patch/put
    })
    test('Updating only status of todo via patch endpoint should work',()=>{
         // get id/body from testinfo
        //use it for patch/put
    })
    test('Updation of status todo should give 400 when status is not either of ACTIVE or DONE',()=>{
        // get id/body from testinfo
        //use it for patch/put
    })
    test.afterEach(()=>{
        // get id/body from testinfo
        // use id to delete todo created here
    })
})