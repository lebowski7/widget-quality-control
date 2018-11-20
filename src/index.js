import evaluateLogFile from './evaluator.js';
import fileContents from './../fileContents.js';

const output = evaluateLogFile(fileContents);

console.log(output); // for console user

window.onload = function() {
  document.getElementById('input').innerHTML = fileContents;
  document.getElementById('output').innerHTML = JSON.stringify(output, null, 2); // for window user
};