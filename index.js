const repolinter = require('repolinter')
const IssueFormatter = require('./lib/issue_formatter')

module.exports = function (targetDir, engineConfig) {
  const paths = engineConfig.include_paths
  const issueFormatter = new IssueFormatter(engineConfig.config.default_file || '.codeclimate.yml')

  repolinter.outputInfo = console.error
  repolinter.resultFormatter = issueFormatter
  repolinter.lint(targetDir, paths)
}
