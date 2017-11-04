#!/usr/bin/env node

const path = require('path')
const codeclimateRepolinter = require('..')
const fs = require('fs')
const targetDir = path.resolve(process.cwd(), process.argv[2] || '.')

fs.readFile('/config.json', function (err, data) {
  if (!err) {
    var config = JSON.parse(data)
  }

  codeclimateRepolinter(targetDir, config)
})
