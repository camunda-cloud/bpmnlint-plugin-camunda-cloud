const {
  is, isAny
} = require('bpmnlint-utils');

const getExtensionElements = require('./utils/extensionElementsHelper');

const messageElements = ['bpmn:EndEvent', 'bpmn:IntermediateThrowEvent']
const servicTaskLike = ['bpmn:BusinessRuleTask', 'bpmn:SendTask', 'bpmn:ServiceTask', 'bpmn:ScriptTask', ...messageElements]

module.exports = function() {

  function check(node, reporter) {
    if (!isAny(node, servicTaskLike)) {
      return;
    }

    if (isAny(node, messageElements)) {
      // check if the element has a message definition, other wise it's not a service task like
      if (!node.eventDefinitions || !node.eventDefinitions.some((eventDefinition) => is(eventDefinition, 'bpmn:MessageEventDefinition'))) {
        return;
      }
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
