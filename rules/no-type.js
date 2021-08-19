const {
  is
} = require('bpmnlint-utils');

const getExtensionElements = require('./utils/extensionElementsHelper');

module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:BusinessRuleTask')) {
      return;
    }

    if (getExtensionElements(node, 'zeebe:taskDefinition').length == 0) {
      reporter.report(node.id, 'No type added for bpmn:BusinessRuleTask. BPMN element must have a Type when automating.');
    }
  }

  return {
    check: check
  };
};
