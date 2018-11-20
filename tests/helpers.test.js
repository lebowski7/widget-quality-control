import { average, standardDeviation } from '../src/helpers';

test('average of [1,5] to be 3', () => {
  expect(average([1, 5])).toBe(3);
});

test('standard deviation of [1,5] to be 2', () => {
  expect(standardDeviation([1, 5])).toBe(2);
});