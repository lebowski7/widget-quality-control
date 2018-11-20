export default (fileContents) => {
  let result = {};
  let fileContentLine = fileContents.match(/[^\r\n]+/g);
  fileContentLine.forEach(function (line) {
    if(line.includes('reference')) {
      const reference = line.split(' ');
      result.reference = {
        temperature: reference[1],
        humidity: reference[2]
      };
    } else if(line.includes('thermometer') || line.includes('humidity')) {
      const widget = line.split(' ');
      if(!result.hasOwnProperty('widgets')) {
        result.widgets = [];
      }

      let widgetResult = {
        type: widget[0],
        name: widget[1]
      };
      result.widgets.push(widgetResult);
    } else {
      const value = line.split(' ');

      if(result.hasOwnProperty('widgets')) {
        const index = result.widgets.length - 1;
        result.widgets[index].values = [];
        result.widgets[index].values.push(parseFloat(value[1]));
      }
    }
  });

  return result;
};
