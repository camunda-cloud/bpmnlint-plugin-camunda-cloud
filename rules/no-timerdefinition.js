const {
  is
} = require('bpmnlint-utils');

module.exports = function() {

  function check(node, reporter) {
    if (!is(node, 'bpmn:TimerEventDefinition')) {
      return;
    }

    let timeCycle = node.timeCycle;
    if (timeCycle) {
      timeCycle = timeCycle.body;
    }
    let timeDuration = node.timeDuration;
    if (timeDuration) {
      timeDuration = timeDuration.body;
    }
    let timeDate = node.timeDate;
    if (timeDate) {
      timeDate = timeDate.body;
    }

    // catch event can be duration only right now
    if (is(node.$parent, 'bpmn:IntermediateCatchEvent')) {
      if (!timeDuration) {
        reporter.report(node.$parent.id, 'Property “Timer Duration” is missing.');
      }
    }
    // start can be cycle or date
    if (is(node.$parent, 'bpmn:StartEvent')) {
      if (!timeCycle && !timeDate) {
        reporter.report(node.$parent.id, 'Property “Timer Cycle or Date” is missing.');
      }
    }
    // boundary event can be interrupting or not -> Cycle or Duration
    if (is(node.$parent, 'bpmn:BoundaryEvent')) {
      if (!timeDuration && !timeCycle) {
        reporter.report(node.$parent.id, 'Property “Timer Duration or Cycle” is missing.');
      }
    }
  }

  return {
    check: check
  };
};
