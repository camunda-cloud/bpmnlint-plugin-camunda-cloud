/**
 * A rule that checks that sequence flows outgoing from a
 * conditional forking gateway or activity are
 * either default flows _or_ have a condition attached
 */
 module.exports = function() {

    function check(node, reporter) {
      if (node.$type !== 'bpmn:ExclusiveGateway') {
          return;
      }
      if (!isConditionalForking(node)) {
        return;
      }

      const outgoing = node.outgoing || [];
      const incoming = node.incoming || [];

      outgoing.forEach((flow) => {
        let missingCondition = (
          !hasCondition(flow) &&
          !isDefaultFlow(node, flow)
        );

        if (outgoing.length == 1 && incoming.length > 1) {
            missingCondition = false;
        }

        if (missingCondition) {
          reporter.report(flow.id, 'Property “Condition expression” is missing. Alternative: Configure this flow as the default flow. ');
        }
      });
    }

    return {
      check
    };

  };


  // helpers /////////////////////////////

  function isConditionalForking(node) {

    const defaultFlow = node['default'];
    const outgoing = node.outgoing && node.outgoing.length > 0;

    return defaultFlow || outgoing;
  }

  function hasCondition(flow) {
    return !!flow.conditionExpression;
  }

  function isDefaultFlow(node, flow) {
    return node['default'] === flow;
  }
