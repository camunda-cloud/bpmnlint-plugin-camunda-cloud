const {
  is
} = require('bpmnlint-utils');
const getExtensionElements = require('./utils/extensionElementsHelper');

module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:MessageEventDefinition')) {
      return;
    }

    if (!node.messageRef) {
      reporter.report(node.$parent.id, 'Property “Global Message“ is missing.');
    }
    if (node.messageRef && !is(node.$parent, 'bpmn:StartEvent')) {
      const subscription = getExtensionElements(node.messageRef, 'zeebe:subscription') || getExtensionElements(node.messageRef, 'zeebe:Subscription');
      if (!subscription || subscription.length <1) {
        reporter.report(node.$parent.id, 'Property “Correlation Key“ is missing.');
      }
    }
  }

  return {
    check: check
  };
};
