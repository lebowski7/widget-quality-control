import { standardDeviation, average } from "./helpers.js";
import parseLogData from './parser.js';

export default class WidgetQualityControl {
  constructor(fileContents) {
    this.parsedLogFile = parseLogData(fileContents);
  }

  getWidgetEvaluation(widget){
    switch (widget.type) {
      case "thermometer" : return this.evaluateThermometer(widget.values);
      case "humidity" : return this.evaluateHumiditySensor(widget.values);
      default : return null;
    }
  }

  evaluateThermometer(thermometerValues) {
    const avg = average(thermometerValues);
    const deviation = standardDeviation(thermometerValues);
    if(deviation < 3 && Math.abs(avg - this.parsedLogFile.reference.temperature) < 0.5){
      return 'ultra precise';
    } else if(deviation < 5 && Math.abs(avg - this.parsedLogFile.reference.temperature) < 0.5) {
      return 'very precise';
    } else {
      return 'precise';
    }
  }

  evaluateHumiditySensor(humidityValues) {
    const avg = average(humidityValues);
    return Math.abs(avg - this.parsedLogFile.reference.humidity) > 1 ? 'discard' : 'keep';
  }

  evaluate() {
    const output = {};

    this.parsedLogFile.widgets.forEach((widget) => {
        output[widget.name] = {};
        output[widget.name] = this.getWidgetEvaluation(widget);
    });

    return output;
  }
}