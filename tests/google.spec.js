const {test,expect} = require('@playwright/test')

test("Verify Google Tab Title", async ({page})=>{

    await page.goto("https://google.com")
    const url=await page.url()
    console.log("The page title is" +url)

    const title = await page.title()
    console.log("The title is" +title)
})