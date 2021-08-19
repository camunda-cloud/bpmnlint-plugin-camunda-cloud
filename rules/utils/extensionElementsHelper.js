const { filter } = require('min-dash');

const {
  is
} = require('bpmnlint-utils');

/**
 * Retrieve extensionElements from a given element
 *
 * @param {ModdleElement} element
 * @param {string} [type] - Optional type of extensionElements to be retrieved
 *
 * @return {Array.<ModdleElement>}
 */
module.exports = function getExtensionElements(element, type) {
    let elements = [];
    const extensionElements = element.get('extensionElements');

    if (typeof extensionElements !== 'undefined') {
      const extensionValues = extensionElements.get('values');

      if (typeof extensionValues !== 'undefined') {
        elements = filter(extensionValues, function(value) {
          return is(value, type);
        });
      }
    }

    return elements;
}
