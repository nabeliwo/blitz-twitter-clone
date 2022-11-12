// @ts-check
const { withBlitz } = require('@blitzjs/next')
const withLinaria = require('next-linaria')

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {}

module.exports = withBlitz(withLinaria(config))
