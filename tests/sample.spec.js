// // sample.spec.js
// const { test, expect } = require('@playwright/test');

// test('My First Test', async () => {
//   expect(12).toBe(12);
// });
const {test,expect} = require('@playwright/test')

test.only("My First Test", async function  ({page}){
    expect(12) .toBe(12)
})

test("My Second Test", async function ({page}){
    expect(13.0) .toBe(14)
})

test("My Third Test", async function({page}){
    expect(15) .toBe(15)
})

test("My Forth Test", async function({page}){
  expect("nadeem").toContain("hunzai")
})