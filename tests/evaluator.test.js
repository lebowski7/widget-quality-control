import evaluateLogFile from "../src/evaluator";
import fileContents from '../fileContents'

test('evaluateLogFile should return object', () => {
  expect(typeof evaluateLogFile(fileContents)).toBe('object')
});

test('evaluateLogFile returns good value', () => {
  expect(evaluateLogFile(fileContents)).toEqual({
    "temp-1": "precise",
    "temp-2": "ultra precise",
    "hum-1": "keep",
    "hum-2": "discard"
  })
});