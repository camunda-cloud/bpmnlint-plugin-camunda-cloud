module.exports = {
  configs: {
    zeebe_1_0: {
      rules: {
        'no-business-rule-task': 'error',
        'no-manual-task': 'error',
        'no-script-task': 'error',
        'no-send-task': 'error',
        'no-undefined-task': 'error',
        'no-type': 'error',
        'conditional-sequence-flows': 'error',
        'no-errordefinition': 'error',
        'no-messagedefinition': 'error',
        'no-processid': 'error',
        'no-timerdefinition': 'error',
        'no-user-task': 'error'
      }
    },
    zeebe_1_1: {
      rules: {
        'no-manual-task': 'error',
        'no-undefined-task': 'error',
        'no-type': 'error',
        'conditional-sequence-flows': 'error',
        'no-errordefinition': 'error',
        'no-messagedefinition': 'error',
        'no-processid': 'error',
        'no-timerdefinition': 'error'
      }
    },
    zeebe_1_2: {
      rules: {
        'no-undefined-task': 'error',
        'no-type': 'error',
        'conditional-sequence-flows': 'error',
        'no-errordefinition': 'error',
        'no-messagedefinition': 'error',
        'no-processid': 'error',
        'no-timerdefinition': 'error'
      }
    }
  }
}
