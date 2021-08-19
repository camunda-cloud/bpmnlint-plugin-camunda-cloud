module.exports = {
  configs: {
    zeebe_1_0: {
      rules: {
        'no-business-rule-task': 'error',
        'no-manual-task': 'error',
        'no-script-task': 'error',
        'no-send-task': 'error',
        'no-undefined-task': 'error',
        'no-type': 'error'
      }
    },
    zeebe_1_1: {
      rules: {
        'no-manual-task': 'error',
        'no-undefined-task': 'error',
        'no-type': 'error'
      }
    }
  }
}
