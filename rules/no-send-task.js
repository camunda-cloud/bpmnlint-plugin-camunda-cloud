const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:SendTask')) {
      reporter.report(node.id, 'Unsupported task type bpmn:SendTask. BPMN element send task is support starting with Camunda Cloud 1.1');
    }
  }

  return {
    check: check
  };
};
