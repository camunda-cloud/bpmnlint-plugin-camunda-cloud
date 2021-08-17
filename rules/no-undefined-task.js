const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (node.$type === 'bpmn:Task') {
      reporter.report(node.id, 'Unsupported task type bpmn:Task');
    }
  }

  return {
    check: check
  };
};
