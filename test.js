const { expect } = require('chai');

const { createModdle, readModdle } = require('bpmnlint/lib/testers/helper');

const RuleTester = require('bpmnlint/lib/testers/rule-tester');

const businessRuleTaskRule = require('./rules/no-business-rule-task');
const manualTaskRule = require('./rules/no-manual-task');
const scriptTaskRule = require('./rules/no-script-task');
const sendTaskRule = require('./rules/no-send-task');
const undefinedTaskRule = require('./rules/no-undefined-task');
const noTypeRule = require('./rules/no-type');

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
        message: 'Unsupported task type bpmn:ManualTask'
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
        message: 'Unsupported task type bpmn:Task'
      }
    }
  ]
});

RuleTester.verify('no-type', noTypeRule, {
  valid: [
    {
      moddleElement: readModdle(__dirname + '/rules/no-type/with-task-definition.bpmn'),
    }
  ],
  invalid: [
    {
      moddleElement: readModdle(__dirname + '/rules/no-type/no-task-definition.bpmn'),
      report: {
        id: 'businessRuleTask',
        message: 'No type added for bpmn:BusinessRuleTask. BPMN element must have a Type when automating.'
      }
    }
  ]
});
