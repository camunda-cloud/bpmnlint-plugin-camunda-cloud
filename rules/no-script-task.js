const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ScriptTask')) {
      reporter.report(node.id, 'Unsupported task type bpmn:ScriptTask. BPMN element script task is support starting with Camunda Cloud 1.1');
    }
  }

  return {
    check: check
  };
};
