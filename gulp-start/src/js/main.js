{
    const abc = "ABC";
    console.log("main");

}
async function sum() {
    const a = await 9;
    const b = await delayAndGetRandom(1000);
    const c = await 5;
    await delayAndGetRandom(1000);
    
    return a + b * c;
  }
  
  fn().then(console.log)