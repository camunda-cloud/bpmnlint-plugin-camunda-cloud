const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (node.$type === 'bpmn:Task') {
      reporter.report(node.id, 'This Task Type cannot be executed. Click on the Wrench icon to change the type.');
    }
  }

  return {
    check: check
  };
};
