const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports manual tasks being used.
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ManualTask')) {
      reporter.report(node.id, 'This Task Type cannot be executed. Click on the Wrench icon to change the type.');
    }
  }

  return {
    check: check
  };
};
