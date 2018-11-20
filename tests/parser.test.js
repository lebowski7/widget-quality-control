import parseLogData from "../src/parser";

const testLog = `thermometer temp-1
2007-04-05T22:00 72.4`;

test('should return reference', () => {
  expect(parseLogData(`reference 70.0 45.0`)).toEqual({"reference": {"humidity": "45.0", "temperature": "70.0"}});
});

test('should return widget info', () => {
  expect(parseLogData(`thermometer temp-1`)).toEqual({"widgets": [{"name": "temp-1", "type": "thermometer"}]});
});

test('should return empty object if value is not assigned to widget', () => {
  expect(parseLogData(`2007-04-05T22:00 72.4`)).toEqual({});
});

test('should return widget with assigned value', () => {
  expect(parseLogData(testLog)).toEqual({"widgets": [{"name": "temp-1", "type": "thermometer", "values": [72.4]}]});
});