#!/usr/bin/env node

import { convertArrayToCss, convertCssToArray } from "../dist/css.js";

const tests = [
  async function test1(){
    const name = "convertArrayToCss";
    const test = [["html", "margin", "0"],["body", "margin", "0"]];
    const expected = "body,html{margin:0}"
    const received = await convertArrayToCss(test);
    return {expected, received, name};
  },
  async function test2(){
    const name = "convertCssToArray";
    const test = "body,html{margin:0}";
    const expected = [["body","margin","0"],["html","margin","0"]]
    const received = await convertCssToArray(test);
    return {expected, received, name}
  }
];

tests.forEach(async (test, i)=> {
  const result = await test();

  function checkResult({expected, received}){
    if(Array.isArray(expected)){
      try {
        return JSON.stringify(expected) === JSON.stringify(received);
      } catch(error){
        return false;
      }
    }

    else return expected === received;
  }

  const hasPassed = checkResult(result);
  const {expected, received, name} = result;

  if(!hasPassed){
    console.log(`❌ Test '${name}'`);
    console.log(`Expected: ${expected}`);
    console.log(`Received: ${received}`);
    process.exit(1);
  }
  console.log(`✅ Test '${name}'`);
});