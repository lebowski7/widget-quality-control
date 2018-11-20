import { standardDeviation, average } from "./helpers.js";
import parseLogData from './parser.js';

const WIDGET_TYPES = {
  THERMOMETER: 'thermometer',
  HUMIDITY: 'humidity'
};

const THERMOMETER_OPTIONS = {
  ULTRA_PRECISE: 'ultra precise',
  VERY_PRECISE: 'very precise',
  PRECISE: 'precise'
};

const HUMIDITY_SENSOR_OPTIONS = {
  DISCARD: 'discard',
  KEEP: 'very keep'
};

export default class WidgetQualityControl {
  constructor(fileContents) {
    this.parsedLogFile = parseLogData(fileContents);
  }

  getWidgetEvaluation(widget){
    switch (widget.type) {
      case WIDGET_TYPES.THERMOMETER : return this.evaluateThermometer(widget.values);
      case WIDGET_TYPES.HUMIDITY : return this.evaluateHumiditySensor(widget.values);
      default : return null;
    }
  }

  evaluateThermometer(thermometerValues) {
    const avg = average(thermometerValues);
    const deviation = standardDeviation(thermometerValues);
    if(deviation < 3 && Math.abs(avg - this.parsedLogFile.reference.temperature) < 0.5){
      return THERMOMETER_OPTIONS.ULTRA_PRECISE;
    } else if(deviation < 5 && Math.abs(avg - this.parsedLogFile.reference.temperature) < 0.5) {
      return THERMOMETER_OPTIONS.VERY_PRECISE;
    } else {
      return THERMOMETER_OPTIONS.PRECISE;
    }
  }

  evaluateHumiditySensor(humidityValues) {
    const avg = average(humidityValues);
    return Math.abs(avg - this.parsedLogFile.reference.humidity) > 1 ?
      HUMIDITY_SENSOR_OPTIONS.DISCARD : HUMIDITY_SENSOR_OPTIONS.KEEP;
  }

  evaluate() {
    const output = {};

    this.parsedLogFile.widgets.forEach((widget) => {
        output[widget.name] = this.getWidgetEvaluation(widget);
    });

    return output;
  }
}
