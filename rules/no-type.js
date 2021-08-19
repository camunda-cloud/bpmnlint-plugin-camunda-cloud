const {
  is
} = require('bpmnlint-utils');

const getExtensionElements = require('./utils/extensionElementsHelper');

module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:BusinessRuleTask') && !is(node, 'bpmn:SendTask') && !is(node, 'bpmn:ServiceTask') && !is(node, 'bpmn:ScriptTask')) {
      return;
    }

    const taskDefinition = getExtensionElements(node, 'zeebe:taskDefinition')[0] || getExtensionElements(node, 'zeebe:TaskDefinition')[0];
    if (!taskDefinition || taskDefinition.length < 1) {
      reporter.report(node.id, 'Property “type” is missing.');
    }
  }

  return {
    check: check
  };
};
