const { expect } = require('chai');

const { createModdle, readModdle } = require('bpmnlint/lib/testers/helper');

const RuleTester = require('bpmnlint/lib/testers/rule-tester');

const businessRuleTaskRule = require('./rules/no-business-rule-task');
const manualTaskRule = require('./rules/no-manual-task');
const scriptTaskRule = require('./rules/no-script-task');
const sendTaskRule = require('./rules/no-send-task');
const undefinedTaskRule = require('./rules/no-undefined-task');

const noTypeRule = require('./rules/no-type');
const conditionalSequenceFlowsRule = require('./rules/conditional-sequence-flows.js');
const callActivityNoProcessId = require('./rules/no-processid.js');
const timerDefinitionRule = require('./rules/no-timerdefinition.js');
const errorDefinitionRule = require('./rules/no-errordefinition.js');
const messageDefinitionRule = require('./rules/no-messagedefinition.js');

RuleTester.verify('no-business-rule-task', businessRuleTaskRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<businessRuleTask xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="businessRuleTask" />',
        'bpmn:BusinessRuleTask'
      ),
      report: {
        id: 'businessRuleTask',
        message: 'Unsupported task type bpmn:BusinessRuleTask. BPMN element business rule task is support starting with Camunda Cloud 1.1'
      }
    }
  ]
});

RuleTester.verify('no-manual-task', manualTaskRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<manualTask xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="manualTask" />',
        'bpmn:ManualTask'
      ),
      report: {
        id: 'manualTask',
        message: 'This Task Type cannot be executed. Click on the Wrench icon to change the type.'
      }
    }
  ]
});

RuleTester.verify('no-script-task', scriptTaskRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<scriptTask xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="scriptTask" />',
        'bpmn:ScriptTask'
      ),
      report: {
        id: 'scriptTask',
        message: 'Unsupported task type bpmn:ScriptTask. BPMN element script task is support starting with Camunda Cloud 1.1'
      }
    }
  ]
});

RuleTester.verify('no-send-task', sendTaskRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<sendTask xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="sendTask" />',
        'bpmn:SendTask'
      ),
      report: {
        id: 'sendTask',
        message: 'Unsupported task type bpmn:SendTask. BPMN element send task is support starting with Camunda Cloud 1.1'
      }
    }
  ]
});

RuleTester.verify('no-undefined-task', undefinedTaskRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<task xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="task" />',
        'bpmn:Task'
      ),
      report: {
        id: 'task',
        message: 'This Task Type cannot be executed. Click on the Wrench icon to change the type.'
      }
    }
  ]
});

RuleTester.verify('no-type-tasks', noTypeRule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-type/with-task-definition.bpmn'),
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-type/no-task-def-businessruletask.bpmn'),
      report: {
        id: 'businessRuleTask',
        message: 'Property “type” is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-type/no-task-def-script.bpmn'),
      report: {
        id: 'scriptTask',
        message: 'Property “type” is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-type/no-task-def-send.bpmn'),
      report: {
        id: 'sendTask',
        message: 'Property “type” is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-type/no-task-def-service.bpmn'),
      report: {
        id: 'serviceTask',
        message: 'Property “type” is missing.'
      }
    }
  ]
});

RuleTester.verify('conditional-sequence-flows', conditionalSequenceFlowsRule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/conditional-sequence-flows/valid-default-condition.bpmn')
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/conditional-sequence-flows/valid-two.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/conditional-sequence-flows/no-conditions.bpmn'),
      report: [{
        id: 'SequenceFlow1',
        message: 'Property “Condition expression” is missing. Alternative: Configure this flow as the default flow. '
      },
      {
       id: 'SequenceFlow2',
       message: 'Property “Condition expression” is missing. Alternative: Configure this flow as the default flow. '
      }]
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/conditional-sequence-flows/one-condition.bpmn'),
      report: {
        id: 'SequenceFlow1',
        message: 'Property “Condition expression” is missing. Alternative: Configure this flow as the default flow. '
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/conditional-sequence-flows/default-condition.bpmn'),
      report: {
        id: 'SequenceFlow2',
        message: 'Property “Condition expression” is missing. Alternative: Configure this flow as the default flow. '
      }
    }
  ]
});

RuleTester.verify('no-processid', callActivityNoProcessId, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-processid/callactivity-with-processid.bpmn'),
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-processid/callactivity-no-processid.bpmn'),
      report: {
        id: 'CallActivity1',
        message: 'Property “process ID” is missing.'
      }
    }
  ]
});

RuleTester.verify('no-timerdefinition', timerDefinitionRule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/catchevent-timerdefinition-with-duration.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/boundary-timerdefinition-with-duration.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/boundary-timerdefinition-with-cycle.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/start-timerdefinition-with-cycle.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/start-timerdefinition-with-date.bpmn'),
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/catchevent-timerdefinition-without-duration.bpmn'),
      report: {
        id: 'Timer1',
        message: 'Property “Timer Duration” is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/boundary-timerdefinition-without.bpmn'),
      report: {
        id: 'BoundaryTimer1',
        message: 'Property “Timer Duration or Cycle” is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-timerdefinition/start-timerdefinition-without.bpmn'),
      report: {
        id: 'StartEvent1',
        message: 'Property “Timer Cycle or Date” is missing.'
      }
    }
  ]
});

RuleTester.verify('no-errordefinition', errorDefinitionRule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-errordefinition/catch-error-with-ref.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-errordefinition/throw-error-with-ref.bpmn'),
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-errordefinition/catch-error-without-ref.bpmn'),
      report: {
        id: 'ErrorEvent1',
        message: 'Property “Global Error“ is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-errordefinition/throw-error-without-ref.bpmn'),
      report: {
        id: 'ErrorEvent1',
        message: 'Property “Global Error“ is missing.'
      }
    }
  ]
});

RuleTester.verify('no-messagedefinition', messageDefinitionRule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/boundary-with-ref-with-correlationkey.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/catch-with-ref-with-correlationkey.bpmn'),
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/start-with-ref.bpmn'),
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/boundary-without-ref.bpmn'),
      report: {
        id: 'BoundaryEvent1',
        message: 'Property “Global Message“ is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/boundary-with-ref-without-correlationkey.bpmn'),
      report: {
        id: 'BoundaryEvent1',
        message: 'Property “Correlation Key“ is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/catch-without-ref.bpmn'),
      report: {
        id: 'CatchEvent1',
        message: 'Property “Global Message“ is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/catch-with-ref-without-correlationkey.bpmn'),
      report: {
        id: 'CatchEvent1',
        message: 'Property “Correlation Key“ is missing.'
      }
    },
    {
      moddleElement: readModdle(__dirname + '/rules/tests/no-messagedefinition/start-without-ref.bpmn'),
      report: {
        id: 'StartEvent1',
        message: 'Property “Global Message“ is missing.'
      }
    }
  ]
});
