import WidgetQualityControl from './widgetQualityControl.js';

export default function evaluateLogFile(fileContents) {
  return new WidgetQualityControl(fileContents).evaluate();
}