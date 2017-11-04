const crypto = require('crypto')
const fileExists = require('file-exists')
const SEVERITY_CODES = ['info', 'minor', 'major', 'critical', 'blocker']

function extractDescription (result) {
  return result.message.split('\n')[0]
}

function buildLocation (result, defaultFile) {
  return {
    positions: { begin: { offset: 0 }, end: { offset: 0 } },
    path: fileExists.sync(result.target || '') ? result.target : defaultFile
  }
}

function determineSeverity (result) {
  const level = result.rule.level
  if (!level) {
    return SEVERITY_CODES[1]
  } else if (SEVERITY_CODES.includes(level.toLowerCase())) {
    return level
  } else if (level.toLowerCase() === 'warning') {
    return SEVERITY_CODES[0]
  } else {
    return SEVERITY_CODES[2]
  }
}

function generateFingerprint (result) {
  return crypto.createHash('md5').update(JSON.stringify(result)).digest('hex')
}

class Issue {
  constructor (result, defaultFile) {
    this.result = result
    this.type = 'issue'
    this.check_name = result.rule.id
    this.description = extractDescription(result)
    this.content = { body: result.message }
    this.categories = ['Clarity']
    this.location = buildLocation(result, defaultFile)
    this.severity = determineSeverity(result)
    this.fingerprint = generateFingerprint(result)
  }
}

module.exports = Issue
