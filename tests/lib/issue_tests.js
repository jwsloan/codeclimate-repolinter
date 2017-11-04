
const assert = require('assert')

describe('lib', () => {
  describe('issue', () => {
    const Issue = require('../../lib/issue')
    const result = {
      rule: {
        id: 'some.id'
      },
      message: 'first_line_of_message\nsecond_line\nthird_line',
      target: 'index.js'
    }

    const issue = new Issue(result, 'unused_default_file.yml')

    it('has the correct type', () => {
      assert.equal(issue.type, 'issue')
    })

    it('uses the rule.id for check_name', () => {
      assert.equal(issue.check_name, 'some.id')
    })

    it('extracts the description', () => {
      assert.equal(issue.description, 'first_line_of_message')
    })

    it('uses the entire message as content', () => {
      assert.equal(issue.content.body, 'first_line_of_message\nsecond_line\nthird_line')
    })

    it('is currently hardcoded to use Clarity for categories', () => {
      assert.equal(1, issue.categories.length)
      assert.equal('Clarity', issue.categories[0])
    })

    it('builds the path when target is non-null', () => {
      assert.equal('index.js', issue.location.path)
    })

    it('builds the path using the default file when target is empty', () => {
      const result = {
        rule: {
          id: 'some.id'
        },
        message: 'first_line_of_message\nsecond_line\nthird_line',
        target: null
      }
      const issue = new Issue(result, 'some_file.txt')

      assert.equal('some_file.txt', issue.location.path)
    })

    it('builds the path using the default file when the target is bad', () => {
      const result = {
        rule: {
          id: 'some.id'
        },
        message: 'first_line_of_message\nsecond_line\nthird_line',
        target: 'foo.bar'
      }
      const issue = new Issue(result, 'some_file.txt')

      assert.equal('some_file.txt', issue.location.path)
    })
  })
})
