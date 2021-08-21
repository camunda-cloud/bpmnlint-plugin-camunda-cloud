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
      if (getExtensionElements(node.messageRef, 'zeebe:subscription').length == 0 && getExtensionElements(node.messageRef, 'zeebe:Subscription').length == 0) {
        reporter.report(node.$parent.id, 'Property “Correlation Key“ is missing.');
      }
    }
  }

  return {
    check: check
  };
};
