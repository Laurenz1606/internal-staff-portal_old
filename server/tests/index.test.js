const { works } = require("../src/index");

test("1. test", () => {
  expect(works()).toBe(undefined);
});
