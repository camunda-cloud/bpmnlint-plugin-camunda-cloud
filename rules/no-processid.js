const {
  is
} = require('bpmnlint-utils');

const getExtensionElements = require('./utils/extensionElementsHelper');

module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:CallActivity')) {
      return;
    }

    const calledElement = getExtensionElements(node, 'zeebe:calledElement')[0] || getExtensionElements(node, 'zeebe:CalledElement')[0];
    if (!calledElement || !calledElement.processId) {
      reporter.report(node.id, 'Property “process ID” is missing.');
    }
  }

  return {
    check: check
  };
};
