const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:BusinessRuleTask')) {
      reporter.report(node.id, 'Unsupported task type bpmn:BusinessRuleTask. BPMN element business rule task is support starting with Camunda Cloud 1.1');
    }
  }

  return {
    check: check
  };
};
