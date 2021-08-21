const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:ErrorEventDefinition')) {
      return;
    }

    if (!node.errorRef) {
      reporter.report(node.$parent.id, 'Property “Global Error“ is missing.');
    }

  }

  return {
    check: check
  };
};
