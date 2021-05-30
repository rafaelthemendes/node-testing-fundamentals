const sinon = require("sinon");
const Fibonacci = require("./fibonacci");
const assert = require("assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    for await (const i of fibonacci.execute(3)) {
    }
    const expectedCallCount = 4;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
 
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const [...results] = fibonacci.execute(5);
    const expectedResult = [0, 1, 1, 2, 3];

    const { args } = spy.getCall(2);
    const expectedArgs = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(results, expectedResult);
    assert.deepStrictEqual(args, expectedArgs);
  }
})();
