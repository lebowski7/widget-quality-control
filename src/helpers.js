export function average(data) {
  let sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
  return sum / data.length;
}

export function standardDeviation (values) {
  let avg = average(values);
  let squareDiffs = values.map(function(value){
    let diff = value - avg;
    return diff * diff;
  });
  return Math.sqrt(average(squareDiffs));
}