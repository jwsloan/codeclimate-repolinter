const Issue = require('./issue')

class IssueFormatter {
  constructor (defaultFile) {
    this.defaultFile = defaultFile
  }

  format (result) {
    if (result.getStatus() === 'success') { return }

    return JSON.stringify(new Issue(result, this.defaultFile)) + '\0'
  }
}

module.exports = IssueFormatter
